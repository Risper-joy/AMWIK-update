// app/api/historical-members/route.ts
import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI!
const DB_NAME = process.env.DB_NAME || "amwik"

let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

// GET - Fetch all historical members
export async function GET(request: NextRequest) {
  try {
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    const historicalMembers = await collection
      .find({})
      .sort({ year: -1, uploadDate: -1 })
      .toArray()

    return NextResponse.json(historicalMembers)
  } catch (error) {
    console.error("Error fetching historical members:", error)
    return NextResponse.json(
      { message: "Failed to fetch historical members" },
      { status: 500 }
    )
  }
}

// POST - Upload historical members from CSV
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { members } = body

    if (!members || !Array.isArray(members)) {
      return NextResponse.json(
        { message: "Invalid data format. Expected an array of members." },
        { status: 400 }
      )
    }

    // Validate required fields
    const validMembers = members.filter(member => 
      member.name && 
      member.name.trim() && 
      member.year
    )

    if (validMembers.length === 0) {
      return NextResponse.json(
        { message: "No valid members found in the data." },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    // Add timestamps and clean data
    const membersToInsert = validMembers.map(member => ({
      name: member.name.trim(),
      organisation: (member.organisation || "").trim(),
      email: (member.email || "").trim(),
      phone: (member.phone || "").trim(),
      year: member.year,
      uploadDate: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    // Insert all members
    const result = await collection.insertMany(membersToInsert)

    return NextResponse.json({
      message: "Historical members uploaded successfully",
      count: result.insertedCount,
      insertedIds: result.insertedIds
    })
  } catch (error) {
    console.error("Error uploading historical members:", error)
    return NextResponse.json(
      { message: "Failed to upload historical members" },
      { status: 500 }
    )
  }
}

// app/api/historical-members/[id]/route.ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid member ID" },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Historical member not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Historical member deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting historical member:", error)
    return NextResponse.json(
      { message: "Failed to delete historical member" },
      { status: 500 }
    )
  }
}
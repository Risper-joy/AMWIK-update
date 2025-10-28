// app/api/historical-members/[id]/route.ts
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

// DELETE - Delete a specific historical member
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

// GET - Get a specific historical member
export async function GET(
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

    const member = await collection.findOne({ _id: new ObjectId(id) })

    if (!member) {
      return NextResponse.json(
        { message: "Historical member not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error("Error fetching historical member:", error)
    return NextResponse.json(
      { message: "Failed to fetch historical member" },
      { status: 500 }
    )
  }
}
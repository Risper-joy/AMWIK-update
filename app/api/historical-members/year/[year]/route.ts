// File: app/api/historical-members/year/[year]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

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

// GET - Get all historical members for a specific year
export async function GET(
  request: NextRequest,
  { params }: { params: { year: string } }
) {
  try {
    const { year } = params

    if (!year || year.trim() === "") {
      return NextResponse.json(
        { message: "Year parameter is required" },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    const members = await collection
      .find({ year })
      .sort({ uploadDate: -1, name: 1 })
      .toArray()

    return NextResponse.json({
      year: year,
      count: members.length,
      members: members,
      format: "name, organisation, email, phone, year, uploadDate, source"
    })
  } catch (error) {
    console.error("Error fetching historical members by year:", error)
    return NextResponse.json(
      { message: "Failed to fetch historical members" },
      { status: 500 }
    )
  }
}

// DELETE - Delete all historical members for a specific year
export async function DELETE(
  request: NextRequest,
  { params }: { params: { year: string } }
) {
  try {
    const { year } = params

    if (!year || year.trim() === "") {
      return NextResponse.json(
        { message: "Year parameter is required" },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    // First, get count for confirmation
    const countBeforeDeletion = await collection.countDocuments({ year })
    
    if (countBeforeDeletion === 0) {
      return NextResponse.json(
        { message: `No historical members found for year ${year}` },
        { status: 404 }
      )
    }

    // Delete all records for the specified year
    const result = await collection.deleteMany({ year })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: `No records were deleted for year ${year}` },
        { status: 404 }
      )
    }

    console.log(`✅ Successfully deleted ${result.deletedCount} historical members for year ${year}`)

    return NextResponse.json({
      message: `Successfully deleted all historical members for year ${year}`,
      deletedCount: result.deletedCount,
      year: year
    })
  } catch (error) {
    console.error("Error deleting historical members by year:", error)
    return NextResponse.json(
      { message: "Failed to delete historical members" },
      { status: 500 }
    )
  }
}
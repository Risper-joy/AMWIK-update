// app/api/team-members/route.ts

import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
// Ensure this path is correct
import { TeamMember } from "@/models/TeamMember" 

const MONGODB_URI = process.env.MONGODB_URI!
const DB_NAME = process.env.DB_NAME || "amwik"
const COLLECTION_NAME = "team_members"

let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables")
  }
  
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

// GET - Fetch all team members
export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection<TeamMember>(COLLECTION_NAME)

    // Sort by team and then name
    const teamMembers = await collection
      .find({})
      .sort({ team: 1, name: 1 }) 
      .toArray()

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 }
    )
  }
}

// POST - Add a new team member
export async function POST(request: NextRequest) {
  try {
    const newMemberData: TeamMember = await request.json()

    if (!newMemberData.name || !newMemberData.position || !newMemberData.team || !newMemberData.email) {
        return NextResponse.json(
            { message: "Missing required fields: name, position, team, and email are mandatory." },
            { status: 400 }
        )
    }
    
    // Defaulting missing optional fields
    const memberToInsert: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'> = {
        ...newMemberData,
        expertise: Array.isArray(newMemberData.expertise) ? newMemberData.expertise : [],
        image: newMemberData.image || "default-placeholder.png",
        joinDate: newMemberData.joinDate || new Date().toISOString(),
        status: newMemberData.status || 'active',
        linkedin: newMemberData.linkedin || "",
        twitter: newMemberData.twitter || ""
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection<TeamMember>(COLLECTION_NAME)

    const result = await collection.insertOne({
        ...memberToInsert,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as TeamMember)

    const insertedMember = await collection.findOne({ _id: result.insertedId })

    return NextResponse.json({
      message: "Team member added successfully",
      member: insertedMember,
    }, { status: 201 })

  } catch (error) {
    console.error("Error adding team member:", error)
    return NextResponse.json(
      { message: "Failed to add team member" },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific team member by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid member ID" },
        { status: 400 }
      )
    }

    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection<TeamMember>(COLLECTION_NAME)

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Team member deleted successfully",
      id: id,
    })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json(
      { message: "Failed to delete team member" },
      { status: 500 }
    )
  }
}
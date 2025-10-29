import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Renewal from "@/models/Renewal";
import { MongoClient } from "mongodb";

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

async function archiveToHistoricalMembers(renewal: any) {
  try {
    console.log('📚 Attempting to archive renewal to historical...')
    
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection("historical_members")

    // Extract year from renewalDate or createdAt
    const dateToUse = renewal.renewalDate || renewal.createdAt
    const year = new Date(dateToUse).getFullYear().toString()

    // Format: name, organisation, email, phone
    const historicalMember = {
      name: `${renewal.firstName} ${renewal.lastName}`,
      organisation: renewal.organization || renewal.organisation || "N/A",
      email: renewal.email,
      phone: renewal.phone || "N/A",
      year: year,
      uploadDate: new Date().toISOString(),
      source: 'renewal_approval',
      originalRenewalId: renewal._id.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Check if already archived
    const existing = await collection.findOne({ 
      originalRenewalId: renewal._id.toString() 
    })

    if (existing) {
      // Update existing record
      await collection.updateOne(
        { originalRenewalId: renewal._id.toString() },
        { $set: historicalMember }
      )
      console.log('✅ Updated historical renewal:', renewal.email)
    } else {
      // Insert new record
      await collection.insertOne(historicalMember)
      console.log('✅ Archived new renewal to historical:', renewal.email)
    }

    return true
  } catch (error) {
    console.error('❌ Error archiving to historical members:', error)
    return false
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log('🔄 Updating renewal status...')
    
    await dbConnect()
    const body = await req.json()
    
    const updated = await Renewal.findByIdAndUpdate(params.id, body, { new: true })
    
    if (!updated) {
      return NextResponse.json(
        { error: "Renewal not found" },
        { status: 404 }
      )
    }

    console.log('✅ Renewal status updated to:', body.status)

    // If status is Active, archive to historical members
    if (body.status === "Active") {
      console.log('📚 Renewal activated - archiving to historical...')
      const archived = await archiveToHistoricalMembers(updated)
      
      if (archived) {
        console.log('✅ Renewal successfully archived to historical')
      }
    }

    return NextResponse.json({ 
      ...updated.toObject(),
      archived: body.status === "Active"
    })
  } catch (error: any) {
    console.error('❌ Error updating renewal:', error)
    return NextResponse.json(
      { error: error.message || "Failed to update renewal" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    const deleted = await Renewal.findByIdAndDelete(params.id)
    
    if (!deleted) {
      return NextResponse.json(
        { error: "Renewal not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Error deleting renewal:', error)
    return NextResponse.json(
      { error: error.message || "Failed to delete renewal" },
      { status: 500 }
    )
  }
}
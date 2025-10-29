import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Members'
import mongoose from 'mongoose'
import { MongoClient, ObjectId } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const DB_NAME = process.env.DB_NAME || 'amwik'

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

async function archiveToHistoricalMembers(member: any) {
  try {
    console.log('📚 Attempting to archive member to historical...')
    
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    const collection = db.collection('historical_members')

    // Extract year from application_date or createdAt
    const dateToUse = member.application_date || member.createdAt
    const year = new Date(dateToUse).getFullYear().toString()

    // Format: name, organisation, email, phone
    const historicalMember = {
      name: `${member.first_name} ${member.last_name}`,
      organisation: member.organization || member.organisation || 'N/A',
      email: member.email,
      phone: member.phone || 'N/A',
      year: year,
      uploadDate: new Date().toISOString(),
      source: 'member_approval',
      originalMemberId: member._id.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Check if already archived
    const existing = await collection.findOne({ 
      originalMemberId: member._id.toString() 
    })

    if (existing) {
      // Update existing record
      await collection.updateOne(
        { originalMemberId: member._id.toString() },
        { $set: historicalMember }
      )
      console.log('✅ Updated historical member:', member.email)
    } else {
      // Insert new record
      await collection.insertOne(historicalMember)
      console.log('✅ Archived new member to historical:', member.email)
    }

    return true
  } catch (error) {
    console.error('❌ Error archiving to historical members:', error)
    return false
  }
}

// PUT - Update member status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔄 Updating member status...')
    
    await connectDB()
    
    const { id } = params
    const { status } = await request.json()
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }
    
    // Update member status
    const member = await Member.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    
    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }
    
    console.log('✅ Member status updated to:', status)

    // If approved, archive to historical members
    if (status === 'Approved') {
      console.log('📚 Member approved - archiving to historical...')
      const archived = await archiveToHistoricalMembers(member)
      
      if (archived) {
        console.log('✅ Member successfully archived to historical')
      }
    }
    
    return NextResponse.json({ 
      ...member.toObject(),
      archived: status === 'Approved'
    })
  } catch (error: any) {
    console.error('Error updating member:', error)
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    )
  }
}

// DELETE - Delete member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }
    
    // Delete member
    const member = await Member.findByIdAndDelete(id)
    
    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Member deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { error: 'Failed to delete member' },
      { status: 500 }
    )
  }
}
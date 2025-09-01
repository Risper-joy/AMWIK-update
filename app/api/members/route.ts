import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Members'

// GET - Fetch all members
export async function GET() {
  try {
    console.log('1. Starting API call...')
    
    console.log('2. Attempting to connect to MongoDB...')
    await connectDB()
    console.log('3. MongoDB connected successfully')
    
    console.log('4. Attempting to fetch members...')
    const members = await Member.find({})
      .sort({ application_date: -1 })
      .lean()
    
    console.log('5. Members fetched successfully:', members.length)
    
    return NextResponse.json(members)
  } catch (error: any) {
    console.error('❌ Detailed Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch members',
        details: error.message,
        errorType: error.name 
      },
      { status: 500 }
    )
  }
}

// POST - Create new member
export async function POST(request: NextRequest) {
  try {
    console.log('📝 POST: Starting member creation...')
    
    await connectDB()
    console.log('📝 POST: MongoDB connected')
    
    const data = await request.json()
    console.log('📝 POST: Data received:', Object.keys(data))
    
    // Create new member
    const member = new Member(data)
    await member.save()
    console.log('📝 POST: Member saved successfully')
    
    return NextResponse.json(
      { message: 'Member application submitted successfully', member },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('❌ POST Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Email address already exists' },
        { status: 400 }
      )
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to submit application',
        details: error.message,
        errorType: error.name
      },
      { status: 500 }
    )
  }
}
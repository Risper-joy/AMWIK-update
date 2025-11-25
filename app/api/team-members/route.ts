// app/api/team-members/route.ts

import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import TeamMember from '@/models/TeamMember'
import { ObjectId } from 'mongodb'

/**
 * GET - Fetch all team members or a specific member
 * Query: ?id=<memberId> (optional)
 */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const memberId = searchParams.get('id')

    if (memberId) {
      // Fetch single member
      if (!ObjectId.isValid(memberId)) {
        return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 })
      }

      const member = await TeamMember.findById(memberId)
      if (!member) {
        return NextResponse.json({ error: 'Member not found' }, { status: 404 })
      }

      return NextResponse.json(member)
    } else {
      // Fetch all members, sorted by team and creation date
      const members = await TeamMember.find()
        .sort({ team: 1, createdAt: -1 })
        .lean()

      return NextResponse.json(members)
    }
  } catch (error: any) {
    console.error('GET /api/team-members error:', error)
    return NextResponse.json(
      { error: error.message || 'Error fetching team members' },
      { status: 500 }
    )
  }
}

/**
 * POST - Create a new team member
 */
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.email || !body.position || !body.team || !body.bio) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, position, team, bio' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingMember = await TeamMember.findOne({ 
      email: body.email.toLowerCase() 
    })
    if (existingMember) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Create new member
    const newMember = new TeamMember({
      name: body.name.trim(),
      position: body.position.trim(),
      team: body.team.toLowerCase(),
      image: body.image || '',
      bio: body.bio.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || '',
      linkedin: body.linkedin?.trim() || '',
      twitter: body.twitter?.trim() || '',
      expertise: Array.isArray(body.expertise) ? body.expertise : [],
      joinDate: body.joinDate || new Date(),
      status: body.status || 'active'
    })

    await newMember.save()

    return NextResponse.json(
      { success: true, member: newMember },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('POST /api/team-members error:', error)
    return NextResponse.json(
      { error: error.message || 'Error creating team member' },
      { status: 500 }
    )
  }
}

/**
 * PUT - Update an existing team member
 * Query: ?id=<memberId>
 */
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const memberId = searchParams.get('id')

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      )
    }

    if (!ObjectId.isValid(memberId)) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }

    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.email || !body.position || !body.bio) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, position, bio' },
        { status: 400 }
      )
    }

    // Check if email is being changed to an existing one
    if (body.email) {
      const existingMember = await TeamMember.findOne({
        email: body.email.toLowerCase(),
        _id: { $ne: new ObjectId(memberId) }
      })
      if (existingMember) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        )
      }
    }

    // Prepare update data
    const updateData = {
      name: body.name.trim(),
      position: body.position.trim(),
      team: body.team?.toLowerCase() || 'secretariat',
      image: body.image || '',
      bio: body.bio.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || '',
      linkedin: body.linkedin?.trim() || '',
      twitter: body.twitter?.trim() || '',
      expertise: Array.isArray(body.expertise) ? body.expertise : [],
      status: body.status || 'active'
    }

    // Update member
    const updatedMember = await TeamMember.findByIdAndUpdate(
      memberId,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      member: updatedMember
    })
  } catch (error: any) {
    console.error('PUT /api/team-members error:', error)
    return NextResponse.json(
      { error: error.message || 'Error updating team member' },
      { status: 500 }
    )
  }
}

/**
 * DELETE - Delete a team member
 * Query: ?id=<memberId>
 */
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const memberId = searchParams.get('id')

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      )
    }

    if (!ObjectId.isValid(memberId)) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }

    const deletedMember = await TeamMember.findByIdAndDelete(memberId)

    if (!deletedMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Team member ${deletedMember.name} deleted successfully`
    }, { status: 200 })
  } catch (error: any) {
    console.error('DELETE /api/team-members error:', error)
    return NextResponse.json(
      { error: error.message || 'Error deleting team member' },
      { status: 500 }
    )
  }
}
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"

// GET single event
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const event = await Event.findById(params.id)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error: any) {
    console.error("GET event error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE event
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const body = await req.json()

    const event = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error: any) {
    console.error("PUT event error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const event = await Event.findByIdAndDelete(params.id)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error: any) {
    console.error("DELETE event error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"

// GET all events
export async function GET() {
  try {
    await dbConnect()
    const events = await Event.find().sort({ createdAt: -1 })
    return NextResponse.json(events)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new event
export async function POST(req: Request) {
  try {
    await dbConnect()
    const body = await req.json()

    // Convert tags string -> array if needed
    if (body.tags && typeof body.tags === "string") {
      body.tags = body.tags.split(",").map((t: string) => t.trim())
    }

    const event = new Event(body)
    await event.save()

    return NextResponse.json(event, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

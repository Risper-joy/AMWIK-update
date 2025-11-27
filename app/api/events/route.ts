import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"

// ✅ Utility: safely convert string numbers
const parseNumber = (value: any) =>
  value === "" || value === null || value === undefined ? null : Number(value)

export async function GET() {
  try {
    await dbConnect()
    const events = await Event.find().sort({ startDate: -1, createdAt: -1 }).lean()
    
    console.log('📊 Events fetched:', events.length)
    
    // ✅ Return consistent structure
    return NextResponse.json({
      success: true,
      data: events || []
    })
  } catch (error: any) {
    console.error("❌ GET /api/events error:", error)
    return NextResponse.json(
      { success: false, error: error.message, data: [] },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    let body: any = {}

    // 1️⃣ Check content type
    const contentType = req.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      // JSON body
      body = await req.json()
    } else if (contentType.includes("multipart/form-data")) {
      // FormData body
      const formData = await req.formData()
      formData.forEach((value, key) => {
        body[key] = value
      })
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      )
    }

    // 2️⃣ Clean tags → array
    if (body.tags && typeof body.tags === "string") {
      body.tags = body.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean)
    }

    // 3️⃣ Ensure numbers are numbers
    if (body.capacity) body.capacity = parseNumber(body.capacity)
    if (body.price) body.price = parseNumber(body.price)
    if (body.earlyBirdPrice) body.earlyBirdPrice = parseNumber(body.earlyBirdPrice)

    // 4️⃣ Default createdDate
    if (!body.createdDate) {
      body.createdDate = new Date().toISOString()
    }

    // 5️⃣ Create and save
    const event = new Event(body)
    await event.save()

    console.log('✅ Event created:', { id: event._id, title: event.title })

    return NextResponse.json({
      success: true,
      data: event
    }, { status: 201 })
  } catch (error: any) {
    console.error("❌ POST /api/events error:", error)
    return NextResponse.json(
      { success: false, error: error.message, data: null },
      { status: 500 }
    )
  }
}
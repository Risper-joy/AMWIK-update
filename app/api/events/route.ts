import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"

// ✅ Utility: safely convert string numbers
const parseNumber = (value: any) =>
  value === "" || value === null || value === undefined ? null : Number(value)

export async function GET(req: NextRequest) {
  try {
    console.log("📅 GET /api/events - Starting")
    
    await dbConnect()
    console.log("✅ Database connected")

    // Get all events, sorted by startDate
    const events = await Event.find({})
      .sort({ startDate: -1, createdAt: -1 })
      .lean()
    
    console.log(`✅ Events fetched from DB: ${events.length}`)
    console.log("📊 First event:", events[0] ? { title: events[0].title, status: events[0].status } : "None")

    // Return in consistent format
    return NextResponse.json({
      success: true,
      data: events || [],
      count: events.length
    })
  } catch (error: any) {
    console.error("❌ GET /api/events error:", {
      name: error.name,
      message: error.message,
      code: error.code
    })
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to fetch events",
        data: []
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("📅 POST /api/events - Starting")
    
    await dbConnect()
    console.log("✅ Database connected")

    let body: any = {}

    // 1️⃣ Check content type
    const contentType = req.headers.get("content-type") || ""
    console.log("📝 Content-Type:", contentType)

    if (contentType.includes("application/json")) {
      // JSON body
      body = await req.json()
      console.log("📝 Received JSON body")
    } else if (contentType.includes("multipart/form-data")) {
      // FormData body
      const formData = await req.formData()
      formData.forEach((value, key) => {
        body[key] = value
      })
      console.log("📝 Received FormData body")
    } else {
      console.log("❌ Unsupported content type")
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      )
    }

    console.log("📋 Event data received:", {
      title: body.title,
      status: body.status,
      startDate: body.startDate
    })

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

    // 5️⃣ Ensure status is valid
    if (!body.status) {
      body.status = "Draft"
    }

    console.log("✅ Data cleaned and validated")

    // 6️⃣ Create and save
    const event = new Event(body)
    await event.save()

    console.log('✅ Event created:', { 
      id: event._id, 
      title: event.title, 
      status: event.status 
    })

    return NextResponse.json({
      success: true,
      data: event
    }, { status: 201 })
  } catch (error: any) {
    console.error("❌ POST /api/events error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      errors: error.errors
    })

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      }, { status: 400 })
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to create event",
        data: null 
      },
      { status: 500 }
    )
  }
}
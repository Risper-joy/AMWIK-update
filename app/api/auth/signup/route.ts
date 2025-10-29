import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    console.log("=".repeat(50));
    console.log("🚀 SIGNUP REQUEST STARTED");
    console.log("=".repeat(50));

    const { name, email, password, role } = await req.json();
    console.log("📝 Signup data received - Name:", name, "| Email:", email);

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Connect DB
    console.log("🔌 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");

    // Check if user exists
    console.log("🔍 Checking if user already exists...");
    const existing = await User.findOne({ email });
    console.log("✅ Database query completed");

    if (existing) {
      console.log("❌ User already exists with email:", email);
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    console.log("✅ Email is available");

    // Hash password
    console.log("🔐 Hashing password...");
    const hashed = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    // Create user
    console.log("👤 Creating new user...");
    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: role || "memberOfficer",
      createdAt: new Date(),
    });
    console.log("✅ User created successfully");

    console.log("✅ SIGNUP SUCCESSFUL FOR:", email);
    console.log("=".repeat(50));

    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("=".repeat(50));
    console.error("❌ ERROR IN SIGNUP:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=".repeat(50));

    return NextResponse.json(
      { message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
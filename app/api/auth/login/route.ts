import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    console.log("=".repeat(50));
    console.log("🚀 LOGIN REQUEST STARTED");
    console.log("=".repeat(50));

    // Check JWT_SECRET
    if (!JWT_SECRET) {
      console.error("❌ CRITICAL: JWT_SECRET is not set in environment variables!");
      return NextResponse.json(
        { message: "Server configuration error: JWT_SECRET not set" },
        { status: 500 }
      );
    }
    console.log("✅ JWT_SECRET is set");

    // Parse body
    const body = await req.json();
    const { email, password } = body;
    console.log("📧 Email:", email);
    console.log("🔑 Password received:", !!password);

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // Connect DB
    console.log("🔌 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");

    // Find user
    console.log("🔍 Finding user with email:", email);
    const user = await User.findOne({ email }).select("+password");
    console.log("✅ Database query completed");
    console.log("👤 User found:", !!user);

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("✅ User found:", user.name);
    console.log("🔐 User password field exists:", !!user.password);
    console.log("🔐 User password length:", user.password?.length);

    // Compare password
    console.log("🔐 Starting bcrypt.compare...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("✅ bcrypt.compare completed");
    console.log("✅ Password match:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Password does not match");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("✅ Password is valid");

    // Create token
    console.log("🔑 Creating JWT token...");
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("✅ JWT token created successfully");

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    console.log("✅ Cookie set");
    console.log("✅ LOGIN SUCCESSFUL FOR:", user.email);
    console.log("=".repeat(50));

    return response;
  } catch (error: any) {
    console.error("=".repeat(50));
    console.error("❌ ERROR IN LOGIN:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=".repeat(50));

    return NextResponse.json(
      { message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
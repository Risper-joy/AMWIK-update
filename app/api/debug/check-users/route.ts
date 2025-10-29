// File: app/api/debug/check-users/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    // Find all users without password filter
    const users = await User.find().select("+password");
    console.log("📊 Total users found:", users.length);

    const userInfo = users.map((user: any) => ({
      name: user.name,
      email: user.email,
      role: user.role,
      passwordExists: !!user.password,
      passwordLength: user.password?.length || 0,
      passwordPreview: user.password?.substring(0, 15) || "N/A",
      isBcryptHash: user.password?.startsWith("$2") ? "YES ✅" : "NO ❌",
      createdAt: user.createdAt,
    }));

    return NextResponse.json({
      totalUsers: users.length,
      users: userInfo,
      message: "Database check complete",
    });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { 
        message: "Error checking database",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
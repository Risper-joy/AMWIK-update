import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

const SECRET = process.env.JWT_SECRET || "amwik_secret";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Extract the cookie
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/authToken=([^;]+)/);

    if (!match) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const token = match[1];
    let decoded: any;

    try {
      decoded = jwt.verify(token, SECRET);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return NextResponse.json({ message: "Token expired" }, { status: 403 });
      }
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select("name email role");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Auth /me error:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

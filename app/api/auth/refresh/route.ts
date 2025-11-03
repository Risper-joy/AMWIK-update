import { NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1]
  if (!token) return NextResponse.json({ message: "Missing token" }, { status: 401 })

  try {
    const { payload } = await jwtVerify(token, secret)
    const newToken = await new SignJWT({ email: payload.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret)

    const res = NextResponse.json({ token: newToken })
    res.cookies.set("authToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    return res
  } catch {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
  }
}

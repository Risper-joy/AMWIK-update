import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "")

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Define routes that don't require authentication
  const publicPaths = [
    "/admin/login",
    "/admin/signup",
    "/api/auth/login",
    "/api/auth/signup",
  ]

  // ✅ Check if current path is public
  const isPublicPath = publicPaths.some((p) => pathname === p || pathname.startsWith(p))

  // ✅ Skip Next.js internals and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // ✅ Allow public paths without token
  if (isPublicPath) {
    return NextResponse.next()
  }

  // ✅ Protect /admin routes (including /admin itself)
  if (pathname.startsWith("/admin")) {
    const token =
      request.cookies.get("authToken")?.value ||
      request.headers.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not configured")
      }
      await jwtVerify(token, secret)
    } catch (err) {
      console.error("❌ Invalid or expired JWT:", err)
      const res = NextResponse.redirect(new URL("/admin/login", request.url))
      res.cookies.delete("authToken")
      return res
    }
  }

  // ✅ Protect /api routes
  if (pathname.startsWith("/api")) {
    const token =
      request.cookies.get("authToken")?.value ||
      request.headers.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not configured")
      }
      await jwtVerify(token, secret)
    } catch (err) {
      console.error("❌ Invalid or expired JWT:", err)
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|images|favicon\\.ico).*)"],
}
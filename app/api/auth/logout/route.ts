import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("=".repeat(50));
    console.log("🚪 LOGOUT REQUEST");
    console.log("=".repeat(50));

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    console.log("✅ Auth cookie cleared");
    console.log("✅ LOGOUT SUCCESSFUL");
    console.log("=".repeat(50));

    return response;
  } catch (error: any) {
    console.error("=".repeat(50));
    console.error("❌ ERROR IN LOGOUT:");
    console.error("Error message:", error.message);
    console.error("=".repeat(50));

    return NextResponse.json(
      { message: "Logout error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Renewal from "@/models/Renewal";

// GET all renewals
export async function GET() {
  await dbConnect();
  const renewals = await Renewal.find().sort({ renewalDate: -1 });
  return NextResponse.json(renewals);
}

// POST new renewal
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const renewal = await Renewal.create(body);
  return NextResponse.json(renewal);
}

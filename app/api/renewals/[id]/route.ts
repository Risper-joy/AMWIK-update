import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Renewal from "@/models/Renewal";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Renewal.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  await Renewal.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

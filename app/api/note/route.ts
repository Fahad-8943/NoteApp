import { connectDB } from "@/lib/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newNotes = await notes.create(body);

    return NextResponse.json(
      { message: "Note added successfully", data: newNotes },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something  went wrong", data: {} },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const allNotes = await notes.find();

    return NextResponse.json(
      { message: "Note fetching successfully", data: allNotes },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something  went wrong", data: {} },
      { status: 500 },
    );
  }
}

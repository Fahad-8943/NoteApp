import { connectDB } from "@/lib/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const noteDetails = await notes.findById(id);
    return NextResponse.json(
      { message: "note Details", data: noteDetails },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong", data: {} },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updatedNote = await notes.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(
      { message: "Note updated Succesfully", data: updatedNote },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong", data: {} },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedNote = await notes.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Note deleted successfully", data: deletedNote },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong", data: {} },
      { status: 500 },
    );
  }
}

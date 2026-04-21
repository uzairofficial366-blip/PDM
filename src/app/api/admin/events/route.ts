import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

async function checkAdmin() {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") return false;
  return true;
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { title, description, date, location, image, published } = body;
    if (!title || !description || !date || !location) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    const event = await prisma.event.create({
      data: { title, description, date: new Date(date), location, image: image || null, published: published ?? true },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { id, title, description, date, location, image, published } = body;
    const event = await prisma.event.update({
      where: { id },
      data: { title, description, date: new Date(date), location, image: image || null, published },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

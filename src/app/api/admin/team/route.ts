import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

async function checkAdmin() {
  const user = await getAuthUser();
  return !!(user && user.role === "ADMIN");
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { name, designation, description, image, order } = body;
    if (!name || !designation || !description) {
      return NextResponse.json({ error: "Name, designation, description required" }, { status: 400 });
    }
    const member = await prisma.teamMember.create({
      data: { name, designation, description, image: image || null, order: order || 0 },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { id, name, designation, description, image, order } = body;
    const member = await prisma.teamMember.update({
      where: { id },
      data: { name, designation, description, image: image || null, order: order || 0 },
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}

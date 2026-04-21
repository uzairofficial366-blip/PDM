import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

async function checkAdmin() {
  const user = await getAuthUser();
  return !!(user && user.role === "ADMIN");
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const volunteers = await prisma.volunteer.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(volunteers);
}

export async function PUT(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, status } = await request.json();
    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(volunteer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update volunteer" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.volunteer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete volunteer" }, { status: 500 });
  }
}

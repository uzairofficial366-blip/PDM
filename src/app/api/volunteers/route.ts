import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const volunteers = await prisma.volunteer.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const volunteer = await prisma.volunteer.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), message: message?.trim() || null },
    });

    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

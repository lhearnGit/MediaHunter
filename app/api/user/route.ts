import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextRequest, NextResponse } from "next/server";

//get all users
export async function GET() {
  const user = await prisma.user.findMany();

  if (!user) return NextResponse.json({ status: 404 });

  return NextResponse.json(user, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  //validate body

  //check for and prevent duplicate user

  const newUser = await prisma.user.create({ data: { name: body.name } });

  return NextResponse.json(newUser, { status: 200 });
}

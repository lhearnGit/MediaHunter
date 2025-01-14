import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  //validate body

  //check for and prevent duplicate user

  const newUser = await prisma.user.create({ data: { name: body.name } });

  return NextResponse.json(newUser, { status: 200 });
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { id: number }) {
  const id = params.id;

  const show = await prisma.shows.findFirst({
    where: { id: id },
    select: { id: true, name: true },
  });

  if (!show) return NextResponse.json({ messsage: "Not Found", status: 404 });
  return NextResponse.json({ ...show, status: 200 });
}

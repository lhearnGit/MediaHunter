import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
//get one specific game based on ID
export async function GET(req: NextRequest, params: { id: number }) {
  const id = params.id;

  const game = await prisma.igdb_Games.findFirst({
    where: { id: id },
    select: { id: true, name: true, url: true },
  });

  if (!game) return NextResponse.json({ messsage: "Not Found", status: 404 });
  return NextResponse.json({ game, status: 200 });
}

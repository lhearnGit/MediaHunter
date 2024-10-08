import { postNewGame } from "@/apiFunctions/games/postNewGame";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

//Populate Games from an Array of Args
//Bulk Fetch Operation

export async function GET(req: NextRequest, params: { id: number }) {
  const id = params.id;

  const game = await prisma.igdb_Games.findFirst({
    where: { id: id },
    select: { id: true, name: true, url: true },
  });

  if (!game) return NextResponse.json({ messsage: "Not Found", status: 404 });
  return NextResponse.json({ game, status: 200 });
}

//post new game - id & Game Object
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, name } = body;

  //check for game & create game if it does not exist in DB
  await postNewGame(id, name);
}

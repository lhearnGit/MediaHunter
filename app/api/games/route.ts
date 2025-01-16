import { Game } from "@/lib/entities/IGDB";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.toString());
  const params = req.nextUrl.searchParams;

  let page: number | null | string = params.get("page");
  if (!page) page = 1;
  else page = parseInt(page);
  const request: IGDB_Request = {
    endpoint: "games",
    query: `
  fields name,cover.url; 
  limit 5; 
  offset ${5 * (page - 1)};
  sort rating_count desc;
  where (themes=[1] & genres=[31]);`,
  };

  const games: Game[] = await IGDB_Fetch(request);
  console.log(request.query);
  return NextResponse.json({ games, status: 200 });
}

//post new game - id & Game Object
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, name } = body;

  //check for game & create game if it does not exist in DB
  await postNewGame(id, name);
  return NextResponse.json({ status: 200 });
}

async function postNewGame(id: number, name: string, url?: string) {
  const game = await prisma.games.findUnique({
    where: { id: id },
    select: { pid: true },
  });
  //  console.log(game);
  //if the game entry is not saved, create it.
  if (!game) {
    const newGame = await prisma.games.create({
      data: {
        id: id,
        name: name,
        imageUrl: url,
      },
      select: {
        pid: true,
      },
    });
    return newGame;
  } else return game;
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";

import { NextRequest, NextResponse } from "next/server";
import { Game } from "@/lib/entities/IGDB";
//get one user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      tvShows: { select: { id: true, name: true, imageUrl: true } },
      movies: { select: { id: true, name: true, imageUrl: true } },
      games: { select: { id: true, name: true } },
    },
  });

  if (!user) return NextResponse.json({ status: 404 });

  let ids = "";
  user?.games.forEach((game, index) => {
    if (index + 1 == user.games.length) {
      ids = ids + game.id;
    } else {
      ids = ids + game.id + ",";
    }
  });

  if (!user)
    return NextResponse.json({
      message: "Error, Requested Information does not exist",
      status: 404,
    });
  else {
    const request: IGDB_Request = {
      endpoint: "games",
      query: `fields 
      id,name,cover.url;
      
      where id=(${ids});`,
    };

    const games: Game[] = await IGDB_Fetch(request);

    return NextResponse.json(
      { movies: user.movies, shows: user.tvShows, games: games },
      { status: 200 }
    );
  }
}

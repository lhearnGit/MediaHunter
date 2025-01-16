import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";
//get one user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      name: true,
      tvShows: { select: { id: true, name: true, imageUrl: true } },
      movies: { select: { id: true, name: true, imageUrl: true } },
      games: { select: { id: true, name: true, imageUrl: true } },
    },
  });

  /*

  creates a CSV string for IGDB where filter from IDs not needed for basic data
  let ids = "";
  user?.games.forEach((game, index) => {
    if (index + 1 == user.games.length) {
      ids = ids + game.id;
    } else {
      ids = ids + game.id + ",";
    }
  });
*/
  if (!user)
    return NextResponse.json({
      message: "Error, Requested Information does not exist",
      status: 404,
    });
  else {
    /* 
    uses ids to fetch more data than is stored in prisma.
    has overhead due to additional query, and also may cause issues due to IGDB query limit
    const request: IGDB_Request = {
      endpoint: "games",
      query: `fields 
      id,name,cover.url;
      
      where id=(${ids});`,
    };
    const games: Game[] = await IGDB_Fetch(request);
*/

    return NextResponse.json(user, { status: 200 });
  }
}

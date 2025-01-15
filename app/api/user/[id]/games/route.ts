import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";

import { NextRequest, NextResponse } from "next/server";
import { Game } from "@/lib/entities/IGDB";

//Get all the game ids for a user, then fetch them from IGDB
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      recent_GameIDs: true,
      games: { select: { id: true } },
    },
  });

  let ids = "";
  user?.games.forEach((game, index) => {
    //used to format querystring
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
      query: `
      fields 
        id,
        name,
        cover.url;
      where id=(${ids});`,
    };

    const games: Game[] = await IGDB_Fetch(request);
    return NextResponse.json(
      { games: games, recents: user?.recent_GameIDs },
      { status: 200 }
    );
  }
}

/*

ASSUMPTION --------



TO BE PROTECTED ROUTE

Validation that a USER exists will occur using the session created at login,
 a user who is not authenticated cannot post to a list that does not exist
 a user who is not authenticated should not have access to the ability to mutate data of any kind.


Validation that a GAME's more specific information exists on the 3rd party IGDB database will occur when the Server fetches the data initially, 
the component that triggers this action will not be generated 







*/

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } //validate ID Params in middleware
) {
  const body = await req.json();
  const { data: game, addTo } = body; //aliasing data:game for clarity
  console.log(addTo);

  const user = await prisma.user.findFirst({
    where: { id: params.id },
    select: { recent_GameIDs: true, id: true },
  });
  if (!user) return NextResponse.json({ status: 404 });
  if (!addTo) {
    //if addTo is false, remove the game from the list
    console.log("removing...");
    //removes a game
    await prisma.user.update({
      where: { id: params.id },
      data: {
        games: {
          disconnect: { id: game.id },
        },
      },
    });

    return NextResponse.json({
      status: 200,
    });
  } else {
    await prisma.user
      .update({
        where: {
          id: params.id,
        },
        data: {
          games: {
            connectOrCreate: {
              where: { id: game.id }, //connect to this game
              create: {
                //or create this game if not stored
                id: game.id,
                name: game.name,
                url: game.url,
              },
            },
          },
        },
      })
      .then(async () => {
        //after a game is connected OR created, update the recent list.
        await updateRecents({
          userId: user.id,
          recent_GameIDs: user.recent_GameIDs,
          gameId: game.id,
        });
      });
    return NextResponse.json({ status: 200 });
  }
}

async function updateRecents({
  userId,
  recent_GameIDs,
  gameId,
}: {
  userId: string;
  recent_GameIDs: number[];
  gameId: number;
}) {
  const recent_Games = recent_GameIDs;
  console.log(recent_Games);

  //if id is NOT in array, add it

  if (!recent_Games?.find((id) => id == gameId)) {
    //prevent duplicates

    //if length > 5 remove first, push
    if (recent_Games?.length == 5) {
      const newRecent = recent_Games.slice(1, 5);

      newRecent.push(gameId);

      await prisma.user.update({
        where: { id: userId },
        data: {
          recent_GameIDs: { set: newRecent },
        },
      });

      return newRecent; //assume success
    } else {
      recent_Games?.push(gameId);
      await prisma.user.update({
        where: { id: userId },
        data: {
          recent_GameIDs: { set: recent_Games },
        },
      });

      return recent_Games; //assume success
    }
  }
}

import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Game } from "@/lib/entities/IGDB";
import { NextRequest, NextResponse } from "next/server";
import { Poster } from "@/lib/entities/Poster";

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
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findFirst({
    where: { id: params.id },
    select: { recent_GameIDs: true, id: true },
  });
  if (!user) return NextResponse.json({ status: 404 });

  const body: { data: Poster; addTo: Boolean } = await req.json();

  const { id: gameId, name, imageUrl } = body.data;
  const addTo = body.addTo;
  console.log(addTo);

  async function connectOrCreateGame() {
    await prisma.user
      .update({
        where: {
          id: params.id,
        },
        data: {
          games: {
            connectOrCreate: {
              where: { id: gameId }, //connect to this game
              create: {
                //or create this game if not stored
                id: gameId,
                name,
                imageUrl,
              },
            },
          },
        },
      })
      .then(async (user) => {
        //after a game is connected OR created, update the recent list.
        await updateRecents({
          userId: user.id,
          recent_GameIDs: user.recent_GameIDs,
          gameId: gameId,
        });
      });
  }

  if (!addTo) {
    //if addTo is false, remove the game from the list
    console.log("removing...");
    //removes a game
    await prisma.user.update({
      where: { id: params.id },
      data: {
        games: {
          disconnect: { id: gameId },
        },
      },
    });

    return NextResponse.json({
      status: 200,
    });
  } else {
    await prisma.games
      .findFirst({
        where: { id: gameId },
        select: { id: true, imageUrl: true, name: true },
      })
      .then(async (game) => {
        if (game === null) {
          //if there is no movie
          await connectOrCreateGame();
          return NextResponse.json({ status: 200 });
        } else {
          // if there is a movie
          if (game.imageUrl != imageUrl || game.name != name) {
            //imageURL may change if a different url pattern is used.
            //ID is highly unlikely to ever change, would be extremely breaking on data source side
            //name may change for untitled games or possible spelling or application handling of names, such as capitalization
            await prisma.games
              .update({
                //first update the games
                where: { id: gameId },
                data: { id: gameId, imageUrl, name },
                select: { id: true, imageUrl: true, name: true },
              })
              .then(async () => {
                //then take the newly updated record, and add connect or create it
              });
            await connectOrCreateGame();
          }
        }
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

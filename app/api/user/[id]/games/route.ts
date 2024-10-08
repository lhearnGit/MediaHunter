import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";

import { NextRequest, NextResponse } from "next/server";

//Get all the game ids for a user, then fetch them from IGDB
export async function GET(
  request: NextRequest,
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
      id,name,summary,
      rating,rating_count,
      first_release_date,
      cover.url,
      genres.slug,genres.name,
      themes.slug,themes.name,
      platforms.id, platforms.name, platforms.slug, platforms.platform_family.id;
      
      
      where id=(${ids});`,
    };

    const games = await IGDB_Fetch(request);
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




  RETURNS UPDATED LIST



*/

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } //validate ID Params in middleware
) {
  const body = await request.json();
  const { game, options } = body;

  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });
  if (options) {
    //removes a game
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        games: {
          disconnect: { id: game.id },
        },
      },
      select: {
        name: true,
        games: true,
      },
    });

    return NextResponse.json({
      user,
    });
  }

  const user = await prisma.user
    .update({
      where: {
        id: params.id,
      },
      data: {
        games: {
          connectOrCreate: {
            where: { id: game.id }, //connect to this game
            create: {
              //or create this game
              id: game.id,
              name: game.name,
              url: game.url,
            },
          },
        },
      },

      select: {
        games: { select: { name: true, id: true } },
      },
    })
    .then(async () => {
      //after a game is connected OR created, update the recent list.
      await updateRecents(params.id, game.id);
    });

  return NextResponse.json({ user }, { status: 200 });
}

async function updateRecents(userId: string, gameId: number) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { recent_GameIDs: true },
  });
  const recent_Games = user?.recent_GameIDs;
  console.log(recent_Games);

  //if id is NOT in array, add it

  if (!recent_Games?.find((id) => id == gameId)) {
    //prevent duplicates
    //recent_Games?.push(gameId);

    //if length > 5 remove first, push
    if (recent_Games?.length == 5) {
      console.log("max length");
      const newRecent = recent_Games.slice(1, 5);
      console.log(" sliced " + newRecent);
      newRecent.push(gameId);
      console.log(" Pushed " + newRecent);

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

  console.log(recent_Games);
}

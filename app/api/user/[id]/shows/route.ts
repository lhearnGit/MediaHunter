import { Poster } from "@/lib/entities/Poster";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.shows.findMany();
  return NextResponse.json({ Results: data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } //validate ID Params in middleware
) {
  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });
  const body: { data: Poster; addTo: Boolean } = await req.json();
  const { id: showId, imageUrl, name }: Poster = body.data; //more readable to destructure and rename id to showId
  const addTo = body.addTo;

  async function connectOrCreateShow() {
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        tvShows: {
          connectOrCreate: {
            where: { id: showId }, //connect to this movie
            create: {
              //or create this movie
              id: showId,
              imageUrl,
              name,
            },
          },
        },
      },
    });
  }

  if (!addTo) {
    //removes a show
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        tvShows: {
          disconnect: { id: showId },
        },
      },
      select: {
        name: true,
        tvShowIDs: true,
      },
    });

    return NextResponse.json({
      user,
    });
  } else {
    await prisma.shows
      .findFirst({
        where: { id: showId },
        select: { id: true, imageUrl: true, name: true },
      })
      .then(async (movie) => {
        if (movie === null) {
          //if there is no movie
          await connectOrCreateShow();
          return NextResponse.json({ status: 200 });
        } else {
          // if there is a movie
          if (movie.imageUrl != imageUrl || movie.name != name) {
            //imageURL may change if a different url pattern is used.
            //ID is highly unlikely to ever change, would be extremely breaking on data source side
            //name may change for untitled shows or possible spelling or application handling of names, such as capitalization
            await prisma.shows
              .update({
                //first update the movie
                where: { id: showId },
                data: { id: showId, imageUrl, name },
                select: { id: true, imageUrl: true, name: true },
              })
              .then(async () => {
                //then take the newly updated record, and add connect or create it
              });
            await connectOrCreateShow();
          }
        }
      });

    return NextResponse.json({ status: 200 });
  }
}

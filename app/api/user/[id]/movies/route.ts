import { Poster } from "@/lib/entities/Poster";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.movies.findMany();
  return NextResponse.json({ Results: data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } //validate ID Params in middleware
) {
  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });

  const body: { data: Poster; addTo: Boolean } = await req.json();
  const { id: movieId, imageUrl, name }: Poster = body.data; //more readable to destructure and rename id to movieId
  const addTo = body.addTo;

  async function connectOrCreateMovie() {
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        movies: {
          connectOrCreate: {
            where: { id: movieId }, //connect to this movie
            create: {
              //or create this movie
              id: movieId,
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
        movies: {
          disconnect: { id: movieId },
        },
      },
      select: {
        name: true,
        movieIDs: true,
      },
    });

    return NextResponse.json({
      user,
    });
  } else {
    await prisma.movies
      .findFirst({
        where: { id: movieId },
        select: { id: true, imageUrl: true, name: true },
      })
      .then(async (movie) => {
        if (movie === null) {
          //if there is no movie
          await connectOrCreateMovie();
          return NextResponse.json({ status: 200 });
        } else {
          // if there is a movie
          if (movie.imageUrl != imageUrl || movie.name != name) {
            //imageURL may change if a different url pattern is used.
            //ID is highly unlikely to ever change, would be extremely breaking on data source side
            //name may change for untitled movies or possible spelling or application handling of names, such as capitalization
            await prisma.movies
              .update({
                //first update the movie
                where: { id: movieId },
                data: { id: movieId, imageUrl, name },
                select: { id: true, imageUrl: true, name: true },
              })
              .then(async () => {
                //then take the newly updated record, and add connect or create it
              });
            await connectOrCreateMovie();
          }
        }
      });

    return NextResponse.json({ status: 200 });
  }
}

async function checkForMovieUpdate(moviePoster: Poster) {
  const { id, imageUrl, name } = moviePoster;
  await prisma.movies.findFirst({ where: { id: id } }).then(async (movie) => {
    if (movie != moviePoster) {
      await prisma.movies.update({
        where: { id: id },
        data: { id, imageUrl, name },
      });
    }
  });
}

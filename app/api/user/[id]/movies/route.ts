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
  const body = await req.json();
  const { data: movie, addTo } = body; //aliasing data:game for clarity
  console.log(addTo);
  console.log(movie);

  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });
  if (!addTo) {
    //removes a show
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        movies: {
          disconnect: { id: movie.id },
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
    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        movies: {
          connectOrCreate: {
            where: { id: movie.id }, //connect to this show
            create: {
              //or create this show
              id: movie.id,
              imageUrl: movie.url,
              name: movie.name,
            },
          },
        },
      },
      select: {
        movies: { select: { name: true, imageUrl: true, id: true } },
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  }
}

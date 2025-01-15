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
  const body = await req.json();
  const { data: show, addTo } = body; //aliasing data:game for clarity
  console.log(addTo);
  console.log(show);

  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });
  if (!addTo) {
    //removes a show
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        tvShows: {
          disconnect: { id: show.id },
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
    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        tvShows: {
          connectOrCreate: {
            where: { id: show.id }, //connect to this show
            create: {
              //or create this show
              id: show.id,
              imageUrl: show.url,
              name: show.name,
            },
          },
        },
      },
      select: {
        tvShows: { select: { name: true, imageUrl: true, id: true } },
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  }
}

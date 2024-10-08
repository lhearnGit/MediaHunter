import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await prisma.movies.findMany();
  return NextResponse.json({ Results: data });
}

type BodyObject = {
  itemId: number;
  name: string;
  image?: string;
  options: "REMOVE" | undefined;
};
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } //validate ID Params in middleware
) {
  const body: BodyObject = await request.json();
  const { itemId, name, image, options } = body;

  const exists = await prisma.user.findFirst({ where: { id: params.id } });
  if (!exists) return NextResponse.json({ status: 404 });
  if (options) {
    //removes a show
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        tvShows: {
          disconnect: { id: itemId },
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
  }

  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      tvShows: {
        connectOrCreate: {
          where: { id: itemId }, //connect to this show
          create: {
            //or create this show
            id: itemId,
            imageUrl: image,
            name: name,
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

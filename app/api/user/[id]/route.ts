import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";
//get one users collection
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const collection = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      tvShows: { select: { id: true, name: true, imageUrl: true } },
      movies: { select: { id: true, name: true, imageUrl: true } },
      games: { select: { id: true, name: true, imageUrl: true } },
    },
  });
  if (!collection)
    return NextResponse.json({
      message: "Error, Requested Information does not exist",
      status: 404,
    });
  else {
    return NextResponse.json(collection, { status: 200 });
  }
}

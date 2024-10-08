import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

//post new game - id & name of Movie/Show
type BodyObject = {
  id: number;
  name: string;
  image?: string;
};

export async function POST(req: NextRequest) {
  const body: BodyObject = await req.json();
  const { id, name, image } = body;

  const isStored = await prisma.movies.findFirst({ where: { id: id } });
  if (isStored)
    return NextResponse.json({ message: " Duplicate " }, { status: 200 });
  else {
    await prisma.movies.create({
      data: { id: id, name: name, imageUrl: image },
    });
    return NextResponse.json({ message: "Created" }, { status: 200 });
  }
}

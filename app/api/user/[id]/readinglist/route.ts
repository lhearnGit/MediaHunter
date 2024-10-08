import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { bookId, filter } = body;

  //find the list of readers of the bookId
  const Readers = await prisma.book.findUnique({
    where: { id: bookId },
    select: { readersIDs: true },
  });

  //return if no readers, there is no object, empty arrays are truthy
  if (!Readers) NextResponse.json({ status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { bookIDs: true },
  });
  //return error,
  if (!user) NextResponse.json({ status: 400 });

  //prevent duplicates

  if (filter == "REMOVE") {
    //replace list with filtered array, no native pull function
    const newReadersIDs = Readers!.readersIDs.filter(
      (readerId) => readerId != params.id
    );
    const newNovelIDs = user!.bookIDs.filter((bookIDs) => bookIDs != bookId);

    await prisma.user.update({
      where: { id: params.id },
      data: { bookIDs: newNovelIDs },
    });
    await prisma.book.update({
      where: { id: bookId },
      data: { readersIDs: newReadersIDs },
    });

    return NextResponse.json({ status: 200 });
  } else {
    //add the novel to list lists
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        bookIDs: { push: bookId },
      },
    });

    await prisma.book.update({
      where: {
        id: bookId,
      },

      data: { readersIDs: { push: params.id } },
    });

    return NextResponse.json({ status: 200 });
  }
}

//get one users reading list
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      readingList: true,
    },
  });

  if (!user) return NextResponse.json({ status: 404 });

  return NextResponse.json(user.readingList, { status: 200 });
}

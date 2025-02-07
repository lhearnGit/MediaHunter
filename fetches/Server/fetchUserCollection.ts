import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

export async function fetchUserCollection() {
  const prisma = new PrismaClient();
  const session = await auth();
  if (!session) return null;
  const collection = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      tvShows: { select: { id: true, name: true, imageUrl: true } },
      movies: { select: { id: true, name: true, imageUrl: true } },
      games: { select: { id: true, name: true, imageUrl: true } },
    },
  });
  return collection;
}

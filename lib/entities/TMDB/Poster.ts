import { z } from "zod";

export interface Poster {
  id: number;
  title: string;
  image?: string;
}

export const isValidPoster = z.object({
  id: z.number(), //id of the movie
  name: z.string(), //name of the movie
  imageUrl: z.string().optional(), //image for the poster
});

export type zPoster = z.infer<typeof isValidPoster>;

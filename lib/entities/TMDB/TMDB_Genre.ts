import { z } from "zod";

export const isValidTMDBGenre = z.object({
  id: z.number(),
  name: z.string(),
});

export type TMDB_Genre = z.infer<typeof isValidTMDBGenre>;

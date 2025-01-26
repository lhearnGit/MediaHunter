import { z } from "zod";

export const isValidIGDBGenre = z.object({
  id: z.number(),
  name: z.string(),
});

export type IGDB_Genre = z.infer<typeof isValidIGDBGenre>;

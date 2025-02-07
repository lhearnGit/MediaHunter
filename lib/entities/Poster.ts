import { z } from "zod";

export const isValidPoster = z.object({
  id: z.number().int("is not an integer").gt(0, "cannot be negative"),
  name: z.string(),
  imageUrl: z.string().or(z.undefined()),
});
export type Poster = z.infer<typeof isValidPoster>;

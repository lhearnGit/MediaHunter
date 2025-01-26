import { z } from "zod";

export const isValidArtwork = z.object({
  id: z.number().int("is not an integer").gt(0, "cannot be negative"),
  height: z.number().int("is not an integer").gt(0, "cannot be negative"),
  width: z.number().int("is not an integer").gt(0, "cannot be negative"),
  url: z.string().or(z.undefined()),
});
export type Artwork = z.infer<typeof isValidArtwork>;

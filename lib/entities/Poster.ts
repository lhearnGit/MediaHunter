import { z } from "zod";

export default interface Poster {
  id: number;
  name: string;
  imageUrl: string | undefined;
}

export const isValidPoster = z.object({
  id: z.number().int("is not an integer").gt(0, "cannot be negative"),
  name: z.string().optional(),
  imageUrl: z.string().or(z.undefined()),
});
export type zPoster = z.infer<typeof isValidPoster>;

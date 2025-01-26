import { z } from "zod";

export const isValidCover = z.object({
  id: z.number().gt(0, "cannot be negative"),
  url: z.string().or(z.undefined()),
});
export type Game_Cover = z.infer<typeof isValidCover>;

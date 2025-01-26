import { z } from "zod";
import { isValidCover } from "./Cover";

export const isValidSimilarGame = z.object({
  id: z.number().gt(0, "cannot be negative"),
  cover: isValidCover.optional(),
});
export type Similar_Game = z.infer<typeof isValidSimilarGame>;

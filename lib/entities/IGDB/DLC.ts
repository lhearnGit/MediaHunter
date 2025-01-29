import { z } from "zod";
import { isValidCover } from "./Cover";

export const isValidDLC = z.object({
  id: z.number().int("must be an integer").gt(0, "cannot be negative"),
  cover: isValidCover.optional(),
  name: z.string(),
  total_rating: z.number().optional(),
  total_rating_count: z.number().optional(),
});

export type DLC = z.infer<typeof isValidDLC>;

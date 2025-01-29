import { z } from "zod";

export const isValidCountry = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export type Country = z.infer<typeof isValidCountry>;

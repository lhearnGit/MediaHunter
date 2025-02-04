import { z } from "zod";

export const isValidCountry = z.object({
  iso_3166_1: z.string(),
  english_name: z.string(),
  native_name: z.string(),
});

export type Country = z.infer<typeof isValidCountry>;

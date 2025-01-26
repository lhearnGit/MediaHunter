import { z } from "zod";

export const isValidPlatform = z.object({
  id: z.number(),
  name: z.string(),
  category: z.number().int("Error, Not An Integer").gt(0).lte(6),
  platform_logo: z
    .object({
      id: z.number(),
      url: z.string().or(z.undefined()),
    })
    .or(z.undefined()),
  platform_family: z
    .object({
      id: z.number(),
      name: z.string().or(z.undefined()),
    })
    .or(z.undefined()),
});

export type Platform = z.infer<typeof isValidPlatform>;

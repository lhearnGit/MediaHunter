import { z } from "zod";

//acceptible keys

const idPattern = /^[0-9]|[0-9][1-9]$/;

export const isValidIGDBQuery = z.object({
  queryOption: z.enum(["|", "&"]).default("&"),
  platforms: z
    .enum(["1", "2", "3", "4", "5"])
    .or(z.undefined())
    .or(z.array(z.enum(["1", "2", "3", "4", "5"]))),
  platform_family: z
    .enum(["6", "14"])
    .or(z.undefined())
    .or(z.array(z.enum(["6", "14"]))),
  genres: z
    .array(z.string().regex(idPattern, `Error Not a number`))
    .or(z.string().regex(idPattern, `Error Not a number`))
    .or(z.undefined())
    .or(z.null()),
  themes: z
    .array(z.string().regex(idPattern, `Error Not a number`))
    .or(z.string().regex(idPattern, `Error Not a number`))
    .or(z.undefined())
    .or(z.null()),
  page: z
    .string()
    .regex(idPattern, `Error Not a number`)
    .default("1")
    .or(z.undefined()),
});

export type IGDBQuery = z.infer<typeof isValidIGDBQuery>;

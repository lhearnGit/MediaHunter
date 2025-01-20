import { z } from "zod";

//acceptible keys

const idPattern = /^[0-9]|[0-9][1-9]$/;

export const isValidUrlParam = z.object({
  key: z.enum(["genres", "themes", "page", "page_size", "option"]),
  value: z
    .string()
    .regex(idPattern, `Error, Not a Number`)
    .or(z.enum(["recent", "popular", "upcoming"])), //all IDs used for games will parse to numbers
});

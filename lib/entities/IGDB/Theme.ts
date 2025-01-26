import { z } from "zod";

export const isValidIGDBTheme = z.object({
  id: z.number(),
  name: z.string(),
});
export type Theme = z.infer<typeof isValidIGDBTheme>;

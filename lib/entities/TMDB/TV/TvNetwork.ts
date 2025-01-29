import { z } from "zod";

export const isValidTVNetwork = z.object({
  id: z.number().int("must be an integer").default(0),
  name: z.string(),
  logo_path: z.string().optional(),
});
export type TVNetwork = z.infer<typeof isValidTVNetwork>;

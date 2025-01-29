import { z } from "zod";

export const isValidCastMember = z.object({
  id: z.number().int("must be an integer").default(0),
  name: z.string(),
  profile_path: z.string().or(z.null()),
  known_for_department: z.string().optional(),
  total_episode_count: z.number().int().default(0),
  popularity: z.number().default(0),
});

export type Cast = z.infer<typeof isValidCastMember>;

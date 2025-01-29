import { z } from "zod";

export const isValidEpisode = z.object({
  id: z.number().int("must be an integer"),
  series_id: z.number().int("must be an integer").optional(),
  season_number: z.number().int("must be an integer"),
  episode_number: z.number().int("must be an integer"),

  name: z.string().optional(),
  overview: z.string().optional(),
});

export type Episode = z.infer<typeof isValidEpisode>;

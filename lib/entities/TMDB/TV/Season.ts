import { z } from "zod";
import { isValidEpisode } from "./Episode";

export const isValidSeason = z.object({
  //tmdb documentation has two IDs for a season-details object this is intentional
  _id: z.string().optional(),
  id: z.number().int("must be an integer").default(0),
  series_id: z.number().int("must be an integer").optional(),
  season_number: z.number().int("must be an integer").default(0),
  episode_count: z.number().int("must be an integer").optional(),

  air_date: z.string().nullable(),
  name: z.string().optional(),
  overview: z.string().optional(),
  poster_path: z.string().nullable().optional(),

  episodes: z.array(isValidEpisode).optional(), //a season not started wont have episodes,
});

export type Season = z.infer<typeof isValidSeason>;

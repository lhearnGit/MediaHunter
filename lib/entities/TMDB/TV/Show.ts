import { z } from "zod";
import { isValidSeason } from "./Season";
import { isValidProductionCompany } from "../ProductionCompany";
import { isValidTMDBGenre } from "../TMDB_Genre";
import { isValidTVNetwork } from "./TvNetwork";
import { isValidEpisode } from "./Episode";
import { isValidCastMember } from "../Cast";
import { isValidReviewResponse } from "../Reviews";

export const isValidShow = z.object({
  id: z.number().int("must be an integer").default(0),
  name: z.string(),
  overview: z.string(),
  backdrop_path: z.string().optional(),
  poster_path: z.string().optional(),
  genres: z.array(isValidTMDBGenre),
  production_company: z.array(isValidProductionCompany).optional(),
  reviews: isValidReviewResponse.optional(),

  number_of_episodes: z.number().int("must be an integer").default(0),
  number_of_seasons: z.number().int("must be an integer").default(0),
  status: z.string(),
  first_air_date: z.string(),
  next_episode_to_air: isValidEpisode.or(z.string()).or(z.null()), //TMDB says this should return a string, but testing showed object response
  last_air_date: z.string(),
  in_production: z.boolean().default(true),

  seasons: z.array(isValidSeason).optional(),
  aggregate_credits: z
    .object({
      cast: z.array(isValidCastMember),
    })
    .optional(),
  networks: z.array(isValidTVNetwork).optional(),
});
export type Show = z.infer<typeof isValidShow>;

import { z } from "zod";
import { isValidTMDBGenre } from "../TMDB_Genre";
import { isValidCastMember } from "../Cast";
import { isValidProductionCompany } from "../ProductionCompany";
import { isValidReviewResponse } from "../Reviews";

export const isValidMovie = z.object({
  id: z.number().int("must be an integer").default(0),
  title: z.string(),
  overview: z.string(),
  backdrop_path: z.string().optional(),
  poster_path: z.string().optional(),
  genres: z.array(isValidTMDBGenre),
  runtime: z.number().int("must be an integer").default(0),
  revenue: z.number().int("must be an integer").default(0),
  original_title: z.string(),
  budget: z.number().default(0),
  credits: z
    .object({
      cast: z.array(isValidCastMember),
    })
    .optional(),
  status: z.string(),
  vote_count: z.number().int("Not an Integer").default(0),
  vote_average: z.number().default(0),

  production_companies: z.array(isValidProductionCompany).optional(),
  release_date: z.string(),
  reviews: isValidReviewResponse.optional(),
});

export type Movie = z.infer<typeof isValidMovie>;

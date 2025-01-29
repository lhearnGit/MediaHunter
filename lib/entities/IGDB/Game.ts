import { z } from "zod";
import { isValidArtwork } from "./Artwork";
import { isValidCover } from "./Cover";
import { isValidDLC } from "./DLC";
import { isValidIGDBGenre } from "./IGDB_Genre";
import { isValidInvolvedCompany } from "./Involved_Company";
import { isValidPlatform } from "./Platform";
import { isValidScreenShot, isValidVideo } from "./Screenshot";
import { isValidSimilarGame } from "./Similar_Game";
import { isValidIGDBTheme } from "./Theme";

export const isValidGame = z.object({
  id: z.number(),
  name: z.string(),
  summary: z.string(),
  //storylines are not always included
  storyline: z.string().optional(),
  //cover art may not be available for very old games
  cover: isValidCover.optional(),
  //The following may not be released, there fore cannot have data
  first_release_date: z.number().optional(),
  rating: z.number().optional(),
  rating_count: z.number().optional(),
  aggregated_rating_count: z.number().optional(),
  aggregated_rating: z.number().optional(),
  //end of not released
  platforms: z.array(isValidPlatform),
  genres: z.array(isValidIGDBGenre).or(z.undefined()),
  themes: z.array(isValidIGDBTheme).or(z.undefined()),
  //not all games have additional media
  artworks: z.array(isValidArtwork).optional(),
  videos: z.array(isValidVideo).optional(),
  screenshots: z.array(isValidScreenShot).optional(),
  involved_companies: z.array(isValidInvolvedCompany).optional(),
  //fields that reference other games or content
  similar_games: z.array(isValidSimilarGame).optional(),
  dlcs: z.array(isValidDLC).min(0).or(z.undefined()),
});

export type Game = z.infer<typeof isValidGame>;

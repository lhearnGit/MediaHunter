import { z } from "zod";
import { IGDB_Genre, isValidIGDBGenre } from "./IGDB_Genre";
import { isValidPlatform, Platform } from "./Platform";
import {
  isValidScreenShot,
  isValidVideo,
  ScreenShot,
  Video,
} from "./Screenshot";
import { isValidIGDBTheme, Theme } from "./Theme";
import { Artwork, isValidArtwork } from "./Artwork";
import { DLC, isValidDLC } from "./DLC";
import { isValidInvolvedCompany } from "./Involved_Company";
import { isValidCover } from "./Cover";
import { isValidSimilarGame } from "./Similar_Game";

export interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}

export interface Involved_Company {
  id: number;
  company: {
    id: number;
    name: string;
    url: string;
    logo: { url: string };
  };
  publisher: boolean;
  developer: boolean;
}

interface oGame {
  id: number;
  name: string;
  summary: string;
  storyline?: string;
  cover?: { url: string };
  screenshots?: ScreenShot[];
  artworks: Artwork[];
  videos?: Video[];
  genres: IGDB_Genre[];
  themes: Theme[];
  platforms: Platform[];
  first_release_date: number; //unix date time
  rating: number;
  rating_count: number;
  aggregated_rating: number;
  aggregated_rating_count: number;
  similar_games: Game_Cover[];
  dlcs: DLC[];
  involved_companies: Involved_Company[];
}

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
  genres: z.array(isValidIGDBGenre),
  themes: z.array(isValidIGDBTheme),
  //not all games have additional media
  artworks: z.array(isValidArtwork).optional(),
  videos: z.array(isValidVideo).optional(),
  screenshots: z.array(isValidScreenShot).optional(),
  involved_companies: z.array(isValidInvolvedCompany).optional(),
  //fields that reference other games or content
  similar_games: z.array(isValidSimilarGame).optional(),
  dlcs: z.array(isValidDLC).optional(),
});

export type Game = z.infer<typeof isValidGame>;

export interface Game_Details {
  rating: number;
  rating_count: number;
  genres: IGDB_Genre[];
  themes: Theme[];
  platforms: Platform[];
  release_dates: { id: number; human: string }[];
}

import { IGDB_Genre } from "./IGDB_Genre";
import { Platform } from "./Platform";
import { ScreenShot, Video } from "./Screenshot";
import { Theme } from "./Theme";

export interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}
export interface Artwork {
  id: number;
  height: number;
  width: number;
  url: string;
}

export interface DLC {
  id: number;
  cover?: { url: string };
  name: string;
  total_rating: number;
  total_rating_count: number;
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

export interface Game {
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

export interface Game_Details {
  rating: number;
  rating_count: number;
  genres: IGDB_Genre[];
  themes: Theme[];
  platforms: Platform[];
  release_dates: { id: number; human: string }[];
}

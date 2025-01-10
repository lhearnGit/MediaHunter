import { IGDB_Genre } from "./IGDB_Genre";
import { Platform } from "./Platform";
import { ScreenShot, Video } from "./Screenshot";
import { Theme } from "./Theme";

export interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}

export interface Game {
  id: number;
  name: string;
  summary: string;
  storyline?: string;
  cover?: { url: string };
  screenshots?: ScreenShot[];
  videos?: Video[];
  genres: IGDB_Genre[];
  themes: Theme[];
  platforms: Platform[];
  first_release_date: number; //unix date time
  rating: number;
  rating_count: number;
}

export interface Game_Details {
  rating: number;
  rating_count: number;
  genres: IGDB_Genre[];
  themes: Theme[];
  platforms: Platform[];
  release_dates: { id: number; human: string }[];
}

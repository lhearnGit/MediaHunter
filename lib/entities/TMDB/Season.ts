export interface Season {
  id: number;
  name: string;
  air_date: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Season_Details {
  id: number;
  name: string;
  air_date: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  season_number: number;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  season_number: number;
  episode_number: number;
  overview: string;
}

export interface Cast {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string;
  character: string;
  total_episode_count?: number;
}

export type TvNetwork = {
  id: number;
  logo_path: string;
  name: string;
};
export type ShowStatus = {
  currentStatus: string;
  first_air_date: string;
  next_episode_to_air: string;
  last_air_date: string;
  in_production: boolean;
};

export type ShowDetails = {
  networks: TvNetwork[];
  number_of_seasons: number;
  number_of_episodes: number;
};

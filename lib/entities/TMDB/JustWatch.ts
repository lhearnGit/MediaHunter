export interface JustWatchProviders {
  link: string;
  rent: WatchProvider;
  flatrate: WatchProvider[];
  buy: WatchProvider[];
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

import { Cast, Episode } from "@/lib/entities/TMDB/Season";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";

const append = "append_to_response=credits";
type DetailsResponse = {
  id: number;

  credits: { cast: Cast[] };
  aggregate_credits?: { cast: Cast[] };
  posterPath: string;
  name: string;
  overview: string;
  episodes: Episode[];
  season_number: number;
};

export async function fetchSeasonDetails({
  seriesId,
  season_number,
}: {
  seriesId: number;
  season_number?: string;
}) {
  const apiClient = new TMDB_Api_Client("GET");
  const { credits, episodes, name, posterPath } =
    await apiClient.TMDB_Fetch_Details<DetailsResponse>(
      `tv/${seriesId}/season/${season_number ? season_number : 1}?${append}`
    );

  const { cast } = credits;

  return { cast, episodes, name, posterPath };
}

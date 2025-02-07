import { Cast, Episode } from "@/lib/entities/TMDB/Season";
import { TMDB_Fetch_Details } from "@/services/tmdb-api-client-v2";

const append = "append_to_response=credits,episode";
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
  const { credits, episodes, name, posterPath } =
    await TMDB_Fetch_Details<DetailsResponse>({
      endpoint: `tv/${seriesId}/season/${
        season_number ? season_number : 1
      }?${append}`,
    });

  const { cast } = credits;

  return { cast, episodes, name, posterPath };
}

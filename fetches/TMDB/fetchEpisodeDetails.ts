import { TMDB_Fetch_Details } from "@/services/tmdb-api-client-v2";

const append = "append_to_response=credits";
type EpisodeResponse = {
  overview: string;
  name: string;
};

export async function fetchEpisodeDetails({
  seriesId,
  season_number,
  episode_number,
}: {
  seriesId: number;
  season_number: string;
  episode_number: string;
}) {
  const { overview, name } = await TMDB_Fetch_Details<EpisodeResponse>({
    endpoint: `tv/${seriesId}/season/${season_number}/episode/${episode_number}?${append}`,
  });

  return { overview, name };
}

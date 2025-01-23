import { TMDB_Fetch_Details } from "@/services/tmdb-api-client-v2";

export async function fetchDetails<T>({
  endpoint,
  id,
  append,
}: {
  endpoint: "tv" | "movie";
  id: number;
  append?: string;
}) {
  const details = await TMDB_Fetch_Details<T>({
    endpoint: `${endpoint}/${id}?${append}`,
  });
  return details;
}

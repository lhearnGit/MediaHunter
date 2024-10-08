import { TMDB_Api_Client } from "@/services/tmdb-api-client";

export async function fetchDetails<T>({
  endpoint,
  id,
  append,
}: {
  endpoint: "tv" | "movie";
  id: number;
  append?: string;
}) {
  const api_client = new TMDB_Api_Client("", "GET");

  const details = await api_client.TMDB_Fetch_Details<T>({
    endpoint: `${endpoint}/${id}?${append}`,
  });
  return details;
}

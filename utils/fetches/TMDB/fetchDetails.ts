import { isValidMovie } from "@/lib/entities/TMDB/Movies/Movie";
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

  const { success, data, error } = isValidMovie.safeParse(details);
  console.log(success);
  return details;
}

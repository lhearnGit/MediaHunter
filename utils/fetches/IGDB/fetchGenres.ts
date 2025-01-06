import { IGDB_Genre } from "@/lib/entities/IGDB";
import { IGDB_Fetch } from "@/services/igdb-api-client-v2";
import { sortBy } from "lodash";

export async function fetchGenres() {
  const genres: IGDB_Genre[] = await IGDB_Fetch<IGDB_Genre>({
    endpoint: "genres",
    query: `fields id,name,slug; limit:100; where slug!="erotic";`,
  });

  return sortBy(genres, [`name`]);
}

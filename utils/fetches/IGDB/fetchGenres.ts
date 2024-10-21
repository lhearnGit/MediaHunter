import { IGDB_Genre } from "@/lib/entities/IGDB";
import { IGDB_Fetch } from "@/services/igdb-api-client";
import { sortBy } from "lodash";

export async function fetchGenres() {
  const genres: IGDB_Genre[] = await IGDB_Fetch({
    endpoint: "genres",
    query: `fields id,name,slug; limit:100; where slug!="erotic";`,
  });

  return sortBy(genres, [`name`]);
}

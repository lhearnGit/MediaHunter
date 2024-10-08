import { Theme } from "@/lib/entities/IGDB";
import { IGDB_Fetch } from "@/services/igdb-api-client";

export async function fetchThemes() {
  const themes: Theme[] = await IGDB_Fetch({
    endpoint: "themes",
    query: `fields id,name,slug; limit:100; where id!=(41,42);`,
  });

  return themes;
}

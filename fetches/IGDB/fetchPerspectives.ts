import { IGDB_Fetch } from "@/services/igdb-api-client-v2";
import { sortBy } from "lodash";

interface Player_Perspective {
  id: number;
  name: string;
}

export async function fetchPerspective() {
  const perspectives: Player_Perspective[] = await IGDB_Fetch(
    {
      endpoint: "player_perspectives",
      query: `fields id,name;`,
    },
    604800
  ); //cache time of 1 week

  return sortBy(perspectives, [`name`]);
}

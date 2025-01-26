import { Game } from "@/lib/entities/IGDB";
import { isValidGame } from "@/lib/entities/IGDB/Games";
import {
  IGDB_Fetch_Details,
  IGDB_Request,
} from "@/services/igdb-api-client-v2";
import { GameDataFields } from "./Queries/GameDataQueryFields";

export async function fetchGameDetails(id: number) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `${GameDataFields}
      where id=${id};`,
  };

  const game = await IGDB_Fetch_Details<Game>(request);

  console.log(game);
  const { success, data, error } = isValidGame.safeParse(game);

  if (success) {
    console.log(success);
    return data;
  } else {
    console.log(error);
  }
}

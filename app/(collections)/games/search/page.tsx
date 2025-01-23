import { IGDB_Fetch } from "@/services/igdb-api-client-v2";
import { isValidUrlParam } from "@/utils/zodSchemas/UrlSchema";

import { Game } from "@/lib/entities/IGDB";
import { setQuery } from "@/utils/fetches/IGDB/Queries/GameHomeQueries";
import GameSearchContainer from "../../_components/GameSearchContainer";
import BrowseGames from "../_component/BrowseGames";

const GameSearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      //validate key

      const validate = isValidUrlParam.safeParse({ key, value });
      if (value && validate.success)
        params.append(validate.data.key, validate.data.value.toString());
    }
  }
  let page: number = 1;
  if (!params.has("page") || params.get("page") == null || NaN) {
    params.append("page", "1");
  } else {
    page = parseInt(params.get("page")!); //null and NaN cases are handled above
  }

  const theme = params.get("themes");
  const genre = params.get("genres");
  console.log(params);
  const games = await IGDB_Fetch<Game>({
    endpoint: "games",
    query: setQuery(page, "search", genre, theme),
  });

  return (
    <div>
      <GameSearchContainer />
      <BrowseGames games={games} />
    </div>
  );
};

export default GameSearchPage;

import { IGDB_Fetch } from "@/services/igdb-api-client-v2";
import { isValidUrlParam } from "@/utils/zodSchemas/UrlSchema";
import Link from "next/link";
import SearchParamContainer from "../_components/SearchParamContainer";
import BrowseGames from "./_component/BrowseGames";

import { Game } from "@/lib/entities/IGDB";
import { setQuery } from "@/utils/fetches/IGDB/Queries/GameHomeQueries";
import classes from "./GamesHomePage.module.css";
const GamesHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      //validate key

      let validate = isValidUrlParam.safeParse({ key, value });
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
  let option: string | null = params.has("option")
    ? params.get("option")
    : "recent";
  console.log(params);
  const games = await IGDB_Fetch<Game>({
    endpoint: "games",
    query: setQuery(page, option, genre, theme),
  });

  return (
    <div>
      <div className={classes.navbar}>
        <Link className={classes.navlink} href={`games?option=recent`} replace>
          Recent Releases
        </Link>
        <Link
          className={classes.navlink}
          href={`games?option=upcoming`}
          replace
        >
          Upcoming Releases
        </Link>
        <Link className={classes.navlink} href={`games`} replace>
          Clear
        </Link>
      </div>
      <h1>{option} Games</h1>
      <SearchParamContainer />
      <BrowseGames games={games} />
    </div>
  );
};

export default GamesHome;

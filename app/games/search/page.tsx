import { IGDB_Fetch } from "@/services/igdb-api-client-v2";

import { Game } from "@/lib/entities/IGDB";

import { setQuery } from "@/fetches/IGDB/Queries/GameHomeQueries";
import { z } from "zod";
import BrowseGames from "../_component/BrowseGames";
import GameSearchContainer from "../_component/GameSearchContainer";

const isValidWhereOptions = z.object({
  genres: z.array(z.string()).or(z.string()).optional(),
  platform: z.array(z.string()).or(z.string()).optional(),
  themes: z.array(z.string()).or(z.string()).optional(),
});

type WhereQueryOptions = z.infer<typeof isValidWhereOptions>;

const GameSearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  let searchData: WhereQueryOptions = {};
  let page = 0;
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (key == "page") {
        if (value) {
          page = parseInt(value);
          if (!page) page = 0;
        }
      }

      searchData = { ...searchData, [key]: value };
    }
  }

  function createSearchQuery(page: number) {
    if (Object.entries(searchData).length == 0) return false; //fix this
    const { success, data, error } = isValidWhereOptions.safeParse(searchData);
    if (success) {
      console.log(data);
      let whereString = IGDBWhereCondition(data);
      console.log(whereString);
      const paginationString = `limit 25; offset ${page > 1 ? page * 25 : 0};`;
      const fieldsString = `fields name,cover.url, themes.name, themes.id, genres.id, genres.name, summary, rating, rating_count, platforms.id, platforms.name, platforms.slug, platforms.platform_family.id;`;
      const sortString = ``;
      return (
        fieldsString +
        " " +
        paginationString +
        " " +
        sortString +
        " " +
        whereString
      );
    }
  }
  const searchQuery = createSearchQuery(page);
  console.log(searchQuery);

  const games = await IGDB_Fetch<Game>({
    endpoint: "games",
    query: searchQuery ? searchQuery : setQuery(page, "recent"),
  });

  return (
    <div>
      <GameSearchContainer />
      <BrowseGames games={games} />
    </div>
  );
};

export default GameSearchPage;

const IGDBWhereCondition = (formData: WhereQueryOptions) => {
  const { success, data, error } = isValidWhereOptions.safeParse(formData);
  const option = "&";
  if (success) {
    let where = "where ";
    let index = 0;
    for (const [key, value] of Object.entries(formData)) {
      console.log(key);
      where += `${index > 0 ? `${option}` : ""}`;
      switch (key) {
        case "platform": {
          where += `release_dates.${key}=(${value})`;
          break;
        }
        default: {
          where += ` ${key}=[${value}] `;
        }
      }
      index++;
    }
    return (where += ";");
  } else return false;
};

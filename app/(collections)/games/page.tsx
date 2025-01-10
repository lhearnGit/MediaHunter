import { Game } from "@/lib/entities/IGDB/Games";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";
import BrowseGames from "./_component/BrowseGames";
import GameParamSection from "./_component/GameParamSection";

async function fetchGames(
  page: number,
  page_size: number,
  genre: string | null,
  theme: string | null
) {
  let where = WhereFilter(genre, theme);
  console.log(where);
  const request: IGDB_Request = {
    endpoint: "games",
    query: `
  fields name,cover.url, themes.name, genres.id, themes.id, themes.name, summary, rating, rating_count; 
  limit ${page_size}; 
  offset ${page > 1 ? page * page_size : 0};
  sort rating_count desc;
  ${where}`,
  };
  const games: Game[] = await IGDB_Fetch<Game>({
    ...request,
  });
  console.log(games);
  return games;
}
function WhereFilter(genre: string | null, theme: string | null): string {
  if (genre && theme) return `where genres = ${genre} & themes = ${theme};`;
  if (genre) return `where genres = ${genre};`;
  if (theme) return `where themes = ${theme};`;
  return "";
}

const GamesHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else params.append(key, value);
    }
  }
  if (!params.has("page")) {
    params.append("page", "1");
  }

  const theme = params.get("themes");
  const genre = params.get("genres");
  const page = 1;
  const page_size = 10;
  const games = await fetchGames(page, page_size, genre, theme);
  return (
    <div>
      <GameParamSection />
      <br />
      <br />
      <br />

      <BrowseGames games={games} />
    </div>
  );
};

export default GamesHome;

interface Query_Schema {
  fields: string;
  where: string | "";
  sort: IGDB_Sort_Option;
  page_size: number;
}

interface IGDB_Sort_Option {
  value: "rating" | "release_dates.date";
  order: "asc" | "desc";
}

interface Where_Key_Value {
  key: string;
  values: string;
}

function IGDBWhereStringBuilder({
  condition,
  whereValue1,
  whereValue2,
}: {
  condition: "and" | "or";
  whereValue1: Where_Key_Value;
  whereValue2: Where_Key_Value;
}) {
  if (!whereValue1.values && !whereValue2?.values) return ""; //no where clauses
  if (!whereValue1.values) {
    //if there are no values for first option
    return `where ${whereValue2?.key} = (${whereValue2?.values});`;
  }
  if (!whereValue2.values) {
    //if there are no values for 2nd option
    return `where ${whereValue1?.key} = (${whereValue1?.values});`;
  }

  switch (condition) {
    case "and":
      if (!whereValue2)
        return `where (${whereValue1.key} = [${whereValue1.values}]);`;
      else
        return `where (${whereValue1.key} = [${whereValue1.values}] & ${whereValue2.key} = [${whereValue2.values}]);`;

    case "or": {
      if (!whereValue2?.values)
        return `where (${whereValue1.key} = (${whereValue1.values}));`;
      else
        return `where (${whereValue1.key} = (${whereValue1.values}) & ${whereValue2.key} = (${whereValue2.values}));`;
    }
  }
}

function IGDBQueryStringBuilder({
  fields,
  where,
  sort,
  page_size,
}: Query_Schema) {
  return `
  fields ${fields};
  limit 10;
  sort rating_count ${sort.order};
   ${where}
  `;
}

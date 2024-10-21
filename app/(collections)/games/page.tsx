import { IGDB_Genre } from "@/lib/entities/IGDB";
import CardLink from "@/lib/ui/Card/CardLink";
import SearchParamButton from "@/lib/ui/SearchParamButton/SearchParamButton";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";
import Resize_Image from "@/utils/helpers/IGDB_Image_Helper";
import { Group, SimpleGrid } from "@mantine/core";
import GenreParams from "./_component/GameParamSection";
import ParamSection from "./_component/GameParamSection";
import GameParamSection from "./_component/GameParamSection";

interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}

async function fetchGames(page_number: number, igdb_query_string: string) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: igdb_query_string,
  };
  const response: Game_Cover[] = await IGDB_Fetch({
    ...request,
  });
  return response;
}

const GamesHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else query.append(key, value);
    }
  }

  const gValues = nullChecker(query.get("genres"));
  const tValues = nullChecker(query.get("themes"));

  function nullChecker(value: string | null) {
    if (value == null) return "";
    else return value;
  }

  const genres: Where_Key_Value = { key: "genres", values: gValues };
  const themes: Where_Key_Value = { key: "themes", values: tValues };
  const fields = "name, cover.url";
  const sort: IGDB_Sort_Option = { value: `release_dates.date`, order: `desc` };

  const igdb_query_string = IGDBQueryStringBuilder({
    fields: fields,
    sort: sort,
    where: IGDBWhereStringBuilder({
      condition: "or",
      whereValue1: themes,
      whereValue2: genres,
    }),
  });

  console.log(igdb_query_string);
  const page_number = query.get("page");
  const games = await fetchGames(
    page_number == null ? 0 : parseInt(page_number),
    igdb_query_string
  );

  return (
    <div>
      <GameParamSection />
      <br />
      <br />
      <br />
      <SimpleGrid cols={5}>
        {games.map(({ id, name, cover }) => (
          <CardLink
            key={id}
            id={id}
            title={name}
            image={cover?.url && Resize_Image(cover.url, "cover_big")}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GamesHome;

interface Query_Schema {
  fields: string;
  where: string | "";
  sort: IGDB_Sort_Option;
  offset?: number;
  limit?: number;
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

function IGDBQueryStringBuilder({ fields, where, sort }: Query_Schema) {
  return `
  fields ${fields};
  limit 40;
  sort rating_count ${sort.order};
   ${where}
  `;
}

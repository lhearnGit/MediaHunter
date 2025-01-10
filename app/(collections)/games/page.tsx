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
  fields name,cover.url, themes.name, themes.id, genres.id, genres.name, summary, rating, rating_count; 
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
  if (genre && theme) return `where genres = [${genre}] & themes = [${theme}];`;
  if (genre) return `where genres = [${genre}];`;
  if (theme) return `where themes = [${theme}];`;
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
  if (!params.has("page") || params.get("page") == null) {
    params.append("page", "1");
  }

  const theme = params.get("themes");
  const genre = params.get("genres");

  const page = parseInt(params.get("page")!); //wont return null, as if the page doesn't have a number it will be set above, does not handle NaN errors - >1a - > failure
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

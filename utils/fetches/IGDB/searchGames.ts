import { Game } from "@/lib/entities/IGDB";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client-v2";

export async function searchGames(
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
  return games;
}
function WhereFilter(genre: string | null, theme: string | null): string {
  if (genre && theme) return `where genres = [${genre}] & themes = [${theme}];`;
  if (genre) return `where genres = [${genre}];`;
  if (theme) return `where themes = [${theme}];`;
  return "";
}

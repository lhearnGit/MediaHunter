import Poster from "@/lib/entities/Poster";
import { Movie } from "@/lib/entities/TMDB";
import { TMDB_Fetch_Pages } from "@/services/tmdb-api-client-v2";
import { notFound } from "next/navigation";

export async function fetchPosters(category: "tv" | "movie", params?: string) {
  const endpoint = params
    ? `discover/${category}?${params}`
    : `${category}/popular`;
  const { results, total_pages, total_results } = await TMDB_Fetch_Pages<Movie>(
    {
      endpoint: endpoint,
    }
  );

  if (!results) throw notFound();

  const posters: Poster[] = results.map((result: Movie) => {
    const poster: Poster = {
      id: result.id,
      name: result.title,
      imageUrl: result.poster_path,
    };

    return poster;
  });

  return { posters, total_pages, total_results };
}

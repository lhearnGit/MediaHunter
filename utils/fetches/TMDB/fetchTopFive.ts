import Poster from "@/lib/entities/Poster";
import { Movie } from "@/lib/entities/TMDB/Movies/Movie";
import { TMDB_Fetch_Pages } from "@/services/tmdb-api-client-v2";
import _ from "lodash";
import { notFound } from "next/navigation";

export async function TopFive(endpoint: string) {
  const { results: top_rated } = await TMDB_Fetch_Pages<Movie>({
    endpoint: endpoint,
  });
  if (!top_rated) throw notFound();

  const topFiveMovies: Poster[] = top_rated
    ?.splice(0, 5)
    .map((movie: Movie) => {
      const poster: Poster = {
        id: movie.id,
        name: movie.title,
        imageUrl: movie.poster_path,
      };

      return poster;
    });

  return topFiveMovies;
}

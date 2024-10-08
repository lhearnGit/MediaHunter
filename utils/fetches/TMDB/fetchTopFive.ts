import { Movie } from "@/lib/entities/TMDB/Movie";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import _ from "lodash";
import { notFound } from "next/navigation";

interface Poster {
  id: number;
  title: string;
  image?: string;
}
export async function TopFive(endpoint: string) {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: top_rated } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: endpoint,
  });
  if (!top_rated) throw notFound();

  const topFiveMovies: Poster[] = top_rated
    ?.splice(0, 5)
    .map((movie: Movie) => {
      const poster: Poster = {
        id: movie.id,
        title: movie.title,
        image: movie.poster_path,
      };

      return poster;
    });

  return topFiveMovies;
}

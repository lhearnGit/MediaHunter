import { Movie, Poster } from "@/lib/entities/TMDB";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import { notFound } from "next/navigation";

export async function fetchPopular(endpoint: "tv" | "movie") {
  const tmdb_Api_Client = new TMDB_Api_Client("GET");
  const {
    results: shows,
    total_pages,
    total_results,
  } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: `${endpoint}/popular`,
  });
  const res = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: `${endpoint}/popular`,
  });

  if (!shows) throw notFound();

  const posters: Poster[] = shows.map((movie: Movie) => {
    const poster: Poster = {
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
    };

    return poster;
  });

  return { posters, total_pages, total_results };
}

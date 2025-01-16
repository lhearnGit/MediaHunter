import Poster from "@/lib/entities/Poster";
import { Movie } from "@/lib/entities/TMDB";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { notFound } from "next/navigation";

export async function fetchPosters(category: "tv" | "movie", params?: string) {
  const endpoint = params
    ? `discover/${category}?${params}`
    : `${category}/popular`;
  const tmdb_Api_Client = new TMDB_Api_Client("GET");
  const {
    results: shows,
    total_pages,
    total_results,
  } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: endpoint,
  });
  console.log(endpoint);

  if (!shows) throw notFound();

  const posters: Poster[] = shows.map((movie: Movie) => {
    const poster: Poster = {
      id: movie.id,
      name: movie.title,
      imageUrl: movie.poster_path
        ? TMDB_Image_Helper(movie.poster_path, "original")
        : "/images/notfound.jpg",
    };

    return poster;
  });

  return { posters, total_pages, total_results };
}

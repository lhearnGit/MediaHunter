import { Movie } from "@/lib/entities/TMDB/Movie";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";

export async function TopFiveMovies() {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: top_rated } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: "movie/top_rated",
  });

  const topFiveMovies = top_rated?.splice(0, 5);
  return topFiveMovies;
}
export async function PopFiveMovies() {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: top_rated } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: "movie/popular",
  });

  const popFiveMovies = top_rated?.splice(0, 5);
  return popFiveMovies;
}

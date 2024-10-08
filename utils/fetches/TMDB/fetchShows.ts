import { TV } from "@/lib/entities/TMDB/TV";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";

export async function TopFiveTV() {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: top_rated } = await tmdb_Api_Client.TMDB_Fetch_Pages<TV>({
    endpoint: "tv/top_rated",
  });

  const topFiveTV = top_rated?.splice(0, 5);
  return topFiveTV;
}
export async function PopFiveTV() {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: top_rated } = await tmdb_Api_Client.TMDB_Fetch_Pages<TV>({
    endpoint: "tv/popular",
  });

  const PopFiveTV = top_rated?.splice(0, 5);
  return PopFiveTV;
}

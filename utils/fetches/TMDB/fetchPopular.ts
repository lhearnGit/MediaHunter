import Poster from "@/lib/entities/Poster";
import { TMDB_Fetch_Pages } from "@/services/tmdb-api-client-v2";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { notFound } from "next/navigation";

export async function fetchPopular(endpoint: "tv" | "movie") {
  const { results, total_pages, total_results } =
    await TMDB_Fetch_Pages<Poster>({
      endpoint: `${endpoint}/popular`,
    });

  if (!results) throw notFound();

  const posters: Poster[] = results.map((result: Poster) => {
    const poster: Poster = {
      id: result.id,
      name: result.name,
      imageUrl: result.imageUrl
        ? TMDB_Image_Helper(result.imageUrl, "original")
        : "/images/notfound.jpg",
    };

    return poster;
  });

  return { posters, total_pages, total_results };
}

import { Game } from "@/lib/entities/IGDB";
import {
  IGDB_Fetch_Details,
  IGDB_Request,
} from "@/services/igdb-api-client-v2";
import { round } from "lodash";

export async function fetchGameDetails(id: number) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `fields 
      id,name,
      summary, storyline,
      websites.url,
      age_ratings,
      first_release_date,
      cover.url,
      genres.slug,genres.name,
      themes.slug,themes.name,
      videos.video_id,videos.name,
      screenshots.url, screenshots.id,
      rating,rating_count,
      aggregated_rating, aggregated_rating_count,
      platforms.id, platforms.name, platforms.slug, platforms.platform_family.id,
      
      involved_companies.company.url,involved_companies.company.logo.url, involved_companies.developer, involved_companies.publisher, involved_companies.company.name,
      
      
      dlcs.id, dlcs.name,dlcs.cover.url, dlcs.slug, dlcs.total_rating, dlcs.total_rating_count,
      similar_games.id, similar_games.cover.url;
      where id=${id};`,
  };

  const {
    cover,
    name,
    genres,
    themes,
    platforms,
    summary,
    storyline,
    rating,
    rating_count,
    aggregated_rating,
    aggregated_rating_count,
    videos,
    screenshots,
    similar_games,
    involved_companies,
    dlcs,
  } = await IGDB_Fetch_Details<Game>(request);

  console.log(dlcs);
  return {
    cover,
    name,
    genres,
    themes,
    platforms,
    summary,
    rating: round(rating, 1),
    rating_count,
    aggregated_rating: round(rating, 1),
    aggregated_rating_count,
    videos,
    screenshots,
    similar_games,
    storyline,
    companies: involved_companies,
    dlcs,
  };
}

import { Country, TMDB_Genre } from "@/lib/entities/TMDB/index";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import { sortBy } from "lodash";

const primaries = ["US", "AU", "BR", "CA", "CN", "DE", "FR", "GB", "KR", "JP"];
export async function fetch_TMDB_Countries() {
  const api_client = new TMDB_Api_Client("GET");
  const response = await api_client.fetchList("configuration/countries");
  const countries: Country[] = [];

  primaries.map((code: string) => {
    const country = response.find(
      (country: Country) => country.iso_3166_1 == code
    );
    if (country) countries.push(country);
  });

  return countries;
}
export async function fetch_TMDB_Genres(endpoint: "movie" | "tv") {
  const api_client = new TMDB_Api_Client("GET");
  const response = await api_client.fetchList(`genre/${endpoint}/list`);
  const genres: TMDB_Genre[] = response.genres;

  return sortBy(genres, ["name"]);
}

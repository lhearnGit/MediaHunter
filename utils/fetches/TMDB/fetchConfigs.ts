import { Country, TMDB_Genre } from "@/lib/entities/TMDB/index";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";

const primaries = ["US", "AU", "BR", "CA", "CN", "DE", "FR", "GB", "KR", "JP"];
export async function CountryConfig() {
  const api_client = new TMDB_Api_Client("configuration/", "GET");
  const response = await api_client.fetchList("configuration/countries");
  const countries: Country[] = [];

  primaries.map((code: string) => {
    const country = response.find(
      (country: Country) => country.iso_3166_1 == code
    );
    if (country) countries.push(country);
  });

  return { countries: countries };
}
export async function TMDB_Genres(endpoint: "movie" | "tv") {
  const api_client = new TMDB_Api_Client("", "GET");
  const { genres } = await api_client.fetchList(`genre/${endpoint}/list`);

  return genres;
}

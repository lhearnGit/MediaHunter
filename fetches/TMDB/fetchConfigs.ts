import { Country, TMDB_Genre } from "@/lib/entities/TMDB/index";
import { TMDB_Fetch_List } from "@/services/tmdb-api-client-v2";
import { sortBy } from "lodash";
import { notFound } from "next/navigation";

const primaries = ["US", "AU", "BR", "CA", "CN", "DE", "FR", "GB", "KR", "JP"];
export async function fetch_TMDB_Countries() {
  const results = await TMDB_Fetch_List("configuration/countries");
  if (!results) throw notFound();
  const countries: Country[] = [];

  primaries.map((code: string) => {
    const country = results.find(
      (country: Country) => country.iso_3166_1 == code
    );
    if (country) countries.push(country);
  });
  return countries;
}
export async function fetch_TMDB_Genres(endpoint: "movie" | "tv") {
  const { genres } = await TMDB_Fetch_List(`genre/${endpoint}/list`);
  if (!genres) throw notFound();
  return sortBy(genres, ["name"]);
}

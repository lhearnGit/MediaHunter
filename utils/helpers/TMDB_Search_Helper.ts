import { PipeSeparatedString } from "./stringFns";

export interface TMDB_Search_Options {
  page: string | null;
  genre: string | null;
  country: string | null;
  year: string | null;
}

export function Build_Search_String({
  page,
  genre,
  year,
  country,
}: TMDB_Search_Options) {
  const searchString = new URLSearchParams(
    `include_adult=false&include_video=false&language=en-US`
  );
  if (page) searchString.append(`page`, page);
  if (genre) searchString.append("with_genres", genre);
  if (year) searchString.append("first_air_date_year", year);
  if (country) searchString.append("with_origin_country", country);
  searchString.append(
    "without_companies",
    PipeSeparatedString(ExcludedCompanies)
  );
  searchString.append(
    "without_keywords",
    PipeSeparatedString(ExcludedKeyWords)
  );

  return searchString.toString();
}

const ExcludedCompanies = ["8740", "13990", "173128"];
const ExcludedKeyWords = [
  "910",
  "301766",
  "3201",
  "33841",
  "148534",
  "190370",
  "155477",
  "159551",
  "157661",
];

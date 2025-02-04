import React from "react";
import TMDBSearchContainer from "../../_components/SearchContainer/TMDBSearchContainer";
import {
  fetch_TMDB_Countries,
  fetch_TMDB_Genres,
} from "@/utils/fetches/TMDB/fetchConfigs";
import { z } from "zod";
import { Param } from "@/app/games/_component/SearchForm/Multi/MultiSearchable";
import { Country, TMDB_Genre } from "@/lib/entities/TMDB";
import PageHandler from "@/lib/ui/PageHandler";
import TMDBGallery from "../../_components/TMDBGallery/TMDBGallery";
import { fetchPosters } from "@/utils/fetches/TMDB/fetchPosters";

export const isValidTMDBSearchOptions = z.object({
  with_genres: z.string().optional(),
  without_genres: z.string().optional(),
  sort_by: z.string().default("popularity.desc"),
  with_origin_country: z.string().optional(),
  primary_release_year_gte: z.number().int().optional(),
  primary_release_year_lte: z.number().int().optional(),
  primary_release_year: z.number().int().optional(),
  page: z.number().int().default(1),
});

export type TMDBSearchOptions = z.infer<typeof isValidTMDBSearchOptions>;

const MoviesSearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchString = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    value
      ? searchString.has(key)
        ? searchString.set(key, value)
        : searchString.append(key, value)
      : searchString.delete(key);
  }
  const genres = await fetch_TMDB_Genres("movie");
  const countries = await fetch_TMDB_Countries();

  const params: Param[] = [];

  genres.forEach(({ name, id }: TMDB_Genre) => {
    params.push({ key: "genres", id: id, name: name });
  });
  countries.forEach(({ native_name, iso_3166_1 }: Country) => {
    params.push({ key: "countries", id: iso_3166_1, name: native_name });
  });

  console.log(searchString.toString());
  const { total_pages, posters } = await fetchPosters(
    "movie",
    searchString.toString()
  ); //initial data

  return (
    <div>
      <TMDBSearchContainer endpoint="movies" params={params} />
      <TMDBGallery posters={posters} />
      <PageHandler
        numPages={total_pages && total_pages > 500 ? 500 : total_pages} //tmdb pages args cannot exceed page 500
      />
    </div>
  );
};

export default MoviesSearchPage;

import ParamContainer from "@/app/(collections)/games/_component/ParamContainer";
import { Country, TMDB_Genre } from "@/lib/entities/TMDB";

import SearchParamButton from "@/lib/ui/SearchParamButton/SearchParamButton";
import {
  fetch_TMDB_Countries,
  fetch_TMDB_Genres,
} from "@/utils/fetches/TMDB/fetchConfigs";
import { Grid, SimpleGrid } from "@mantine/core";
const years = [2024, 2023, 2022, 2021, 2020];
const ParamSection = async ({ endpoint }: { endpoint: `movie` | `tv` }) => {
  const genres = await fetch_TMDB_Genres(endpoint);
  const countries = await fetch_TMDB_Countries();

  return (
    <SimpleGrid cols={3}>
      <ParamContainer triggerLabel="Genres">
        <Grid>
          {genres.map((genre: TMDB_Genre) => (
            <SearchParamButton
              key={genre.id}
              paramKey="genre"
              paramValue={genre.id.toString()}
              label={genre.name}
            />
          ))}
        </Grid>
      </ParamContainer>
      <ParamContainer triggerLabel="Country">
        <Grid>
          {countries.map((country: Country) => (
            <SearchParamButton
              key={country.iso_3166_1}
              paramKey="country"
              paramValue={country.iso_3166_1.toString()}
              label={country.english_name}
            />
          ))}
        </Grid>
      </ParamContainer>
      <ParamContainer triggerLabel="Year">
        <Grid>
          {years.map((year: number) => (
            <SearchParamButton
              key={year}
              paramKey={endpoint == "tv" ? "first_air_date_year" : "year"}
              paramValue={year.toString()}
              label={year.toString()}
            />
          ))}
        </Grid>
      </ParamContainer>
    </SimpleGrid>
  );
};

export default ParamSection;

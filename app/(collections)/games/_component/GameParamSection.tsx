import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import SearchParamButton from "@/lib/ui/SearchParamButton/SearchParamButton";
import { fetchGenres } from "@/utils/fetches/IGDB/fetchGenres";
import { fetchThemes } from "@/utils/fetches/IGDB/fetchThemes";
import { Grid, GridCol, Text } from "@mantine/core";
import ParamContainer from "./ParamContainer";

const GameParamSection = async () => {
  const genres = await fetchGenres();
  const themes = await fetchThemes();

  return (
    <ParamContainer triggerLabel="Search Options">
      <Grid>
        <GridCol span={12}>
          <Text size="lg">Genres</Text>
        </GridCol>
        {genres.map((genre: IGDB_Genre) => (
          <SearchParamButton
            key={genre.id}
            paramKey="genres"
            label={genre.name}
            paramValue={genre.id.toString()}
          />
        ))}
      </Grid>
      <Grid>
        <GridCol span={12}>
          <Text size="lg">Themes</Text>
        </GridCol>
        {themes.map((theme: Theme) => (
          <SearchParamButton
            key={theme.id}
            paramKey="themes"
            label={theme.name}
            paramValue={theme.id.toString()}
          />
        ))}
      </Grid>
    </ParamContainer>
  );
};

export default GameParamSection;

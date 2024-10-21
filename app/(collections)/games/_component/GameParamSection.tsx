import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import SearchParamButton from "@/lib/ui/SearchParamButton/SearchParamButton";
import { fetchGenres } from "@/utils/fetches/IGDB/fetchGenres";
import { fetchThemes } from "@/utils/fetches/IGDB/fetchThemes";
import { Container, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import React from "react";

const GameParamSection = async () => {
  const genres = await fetchGenres();
  const themes = await fetchThemes();
  return (
    <Group>
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
    </Group>
  );
};

export default GameParamSection;

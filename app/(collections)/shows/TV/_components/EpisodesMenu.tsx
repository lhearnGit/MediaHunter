import { Episode, Season } from "@/lib/entities/TMDB";
import FloatingSelector from "@/lib/ui/FloatingIndicator/FloatingSelector";
import { GridCol, Title, Space, Grid } from "@mantine/core";
import React from "react";
import SeasonDetails from "./SeasonDetails";
import EpisodeDetails from "./EpisodeDetails";

const EpisodesMenu = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <GridCol span={12}>
      <Title>Seasons</Title>
      <Space h="xl" />
      <FloatingSelector data={episodes.map(({ name }: Episode) => name)} />
      <Space h="xl" />
      <Grid>
        <Grid.Col span={2} />
        <Grid.Col span={8}>
          <EpisodeDetails episode={episodes[1]} />
        </Grid.Col>
        <Grid.Col span={2} />
      </Grid>
    </GridCol>
  );
};

export default EpisodesMenu;

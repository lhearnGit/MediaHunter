import { Cast, Season, TMDB_Genre, TvNetwork } from "@/lib/entities/TMDB";
import { fetchDetails } from "@/utils/fetches/TMDB/fetchDetails";
import {
  Grid,
  GridCol,
  Image,
  Space,
  Title,
  Container,
  Box,
  Text,
  Stack,
} from "@mantine/core";
import React from "react";
import CastGrid from "../../_components/Cast/CastGrid";
import { fetchSeasonDetails } from "@/utils/fetches/TMDB/fetchSeasonDetails";
import StyledBadges from "@/lib/ui/StyledBadges";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";

import SeasonsMenu from "../_components/SeasonsMenu";

interface TVSeriesDetails {
  id: number;
  name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  created_by: { name: string };
  homepage: string;
  status: string;
  networks: TvNetwork[];
  number_of_seasons: number;
  number_of_episodes: number;
  next_episode_to_air: string;
  overview: string;
  seasons?: Season[];
  backdrop_path: string;
  poster_path: string;
  genres: TMDB_Genre[];
}
const TVDetailsPage = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else query.append(key, value);
    }
  }
  const { cast, episodes } = await fetchSeasonDetails({
    seriesId: params.id,
    season_number: query.get("season")?.toString(),
  });

  const {
    name,
    overview,
    seasons,
    genres,
    backdrop_path,
    first_air_date,
    number_of_episodes,
    status,
    networks,
    number_of_seasons,
    poster_path,
    next_episode_to_air,
    last_air_date,
    in_production,
  } = await fetchDetails<TVSeriesDetails>({ endpoint: "tv", id: params.id });

  return (
    <Container size={"xl"}>
      <Grid>
        <GridCol span={12} bg="dark">
          <Title>{name}</Title>
        </GridCol>
        <MainSection backdrop_path={backdrop_path} summary={overview} />
        <DetailsSection
          genres={genres}
          poster={poster_path}
          number_of_seasons={number_of_seasons}
          status={status}
        />
        <GridCol span={10}>
          <Stack>
            <Title>Seasons</Title>
            <SeasonsMenu seasons={seasons} />
          </Stack>
        </GridCol>
        <GridCol span={10}>
          <Title>Cast</Title>
        </GridCol>
        <CastSection cast={cast} />
        <GridCol span={1} />
      </Grid>
    </Container>
  );
};

export default TVDetailsPage;

function MainSection({
  backdrop_path,
  summary,
}: {
  summary: string;
  backdrop_path: string;
}) {
  return (
    <GridCol span={8}>
      {backdrop_path && (
        <Image src={TMDB_Image_Helper(backdrop_path, "original")} />
      )}
      <Space h="xl" />
      <Title>Summary</Title>
      <Text>{summary}</Text>
    </GridCol>
  );
}
function DetailsSection({
  genres,
  poster,
  number_of_seasons,
  status,
}: {
  genres: TMDB_Genre[];
  poster: string;
  number_of_seasons: number;
  status: string;
}) {
  return (
    <GridCol span={4}>
      {poster && <Image src={TMDB_Image_Helper(poster, "original")} />}
      <Space h="xl" />
      <Box>
        <Text size="lg">Genres</Text>
        {genres.map((genre: TMDB_Genre) => (
          <StyledBadges key={genre.id} label={genre.name} color="blue" />
        ))}
        <Text>Seasons : {number_of_seasons}</Text>
        <StyledBadges
          label={status}
          color={status.toLowerCase() == "ended" ? "green" : "red"}
        />
      </Box>
    </GridCol>
  );
}

function CastSection({ cast }: { cast: Cast[] }) {
  return (
    <GridCol span={10}>
      <Space h="xl" />
      <CastGrid cast={cast} />
    </GridCol>
  );
}

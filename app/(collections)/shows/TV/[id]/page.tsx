import { Season, TMDB_Genre, TvNetwork } from "@/lib/entities/TMDB";
import { BannerImage } from "@/lib/ui/Sections/Headers/BannerImage";
import { fetchDetails } from "@/utils/fetches/TMDB/fetchDetails";
import { fetchSeasonDetails } from "@/utils/fetches/TMDB/fetchSeasonDetails";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { Container, Grid, GridCol, Space, Title } from "@mantine/core";
import {
  CastSection,
  DetailsSection,
  MainSection,
} from "../_components/Sections";

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
      <BannerImage
        title={name}
        url={TMDB_Image_Helper(backdrop_path, "original")}
      />
      <Space h="xl" />
      <Grid>
        <GridCol span={8}>
          <MainSection
            summary={overview}
            seasons={seasons}
            episodes={episodes}
          />
          <Title>Cast</Title>
          <CastSection cast={cast} />
        </GridCol>
        <DetailsSection
          genres={genres}
          poster={poster_path}
          number_of_seasons={number_of_seasons}
          status={status}
          networks={networks}
          first_air_date={first_air_date}
          last_air_date={last_air_date}
          number_of_episodes={number_of_episodes}
        />

        <GridCol span={1} />
      </Grid>
    </Container>
  );
};

export default TVDetailsPage;

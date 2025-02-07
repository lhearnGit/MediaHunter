import { Season, Show } from "@/lib/entities/TMDB";
import { Cast } from "@/lib/entities/TMDB/Cast";
import { TVNetwork } from "@/lib/entities/TMDB/TV";
import { isValidSeason } from "@/lib/entities/TMDB/TV/Season";
import { isValidShow } from "@/lib/entities/TMDB/TV/Show";
import { TMDB_Fetch_Details } from "@/services/tmdb-api-client-v2";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import {
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notFound } from "next/navigation";
import CastGrid from "../../_components/Cast/CastGrid";
import Reviews from "../../_components/Review/Reviews";
import TMDBDetails from "../../_components/TMDBDetails";
import { auth } from "@/auth";

const append = "append_to_response=aggregate_credits,reviews";
async function fetchTVDetails(id: number) {
  const result: Show = await TMDB_Fetch_Details<Show>({
    endpoint: `tv/${id}?${append}`,
  });
  const { success, data, error } = isValidShow.safeParse(result);
  if (success) {
    return { ...data };
  } else {
    console.log(error);
    throw notFound();
  }
}

const fetchSeason = async (id: number) => {
  const season: Season = await TMDB_Fetch_Details<Season>({
    endpoint: `tv/${id}/season/1`,
  });
  // console.log(season);

  const { success, data, error } = isValidSeason.safeParse(season);
  if (success) {
    //console.log(`success`, data);
    return data;
  } else throw notFound();
};
const TVDetailsPage = async ({ params }: { params: { id: number } }) => {
  const session = await auth();
  const {
    name,
    overview,
    poster_path,
    genres,
    networks,
    reviews,
    first_air_date,
    last_air_date,
    number_of_episodes,
    number_of_seasons,
    backdrop_path,
    production_company,
    aggregate_credits: credits,
  } = await fetchTVDetails(params.id);

  const season = await fetchSeason(params.id);
  if (credits) console.log(credits.cast[0]);

  return (
    <Container size={"xl"}>
      <Grid columns={12}>
        <GridCol span={12}>
          <Title>{name}</Title>
        </GridCol>

        <GridCol span={8}>
          <Stack px={5} py={10}>
            {backdrop_path && (
              <Image
                src={TMDB_Image_Helper(backdrop_path, "original")}
                alt="no backdrop"
              />
            )}
            <Space h="l" />
            <Title>Summary</Title>
            <Text pl={10}>{overview}</Text>
          </Stack>
          <Title>Cast</Title>
          <Space h="l" />
          <CastGrid cast={credits?.cast} />
        </GridCol>

        <GridCol span={4}>
          <TMDBDetails
            id={params.id}
            title={name}
            genres={genres}
            poster_path={
              poster_path ? TMDB_Image_Helper(poster_path) : undefined
            }
            companies={production_company}
            userId={session?.user.id}
            updatePath="shows"
          >
            <TVSubDetails
              networks={networks ? networks : []}
              number_of_episodes={number_of_episodes}
              number_of_seasons={number_of_seasons}
              first_air_date={first_air_date}
              last_air_date={last_air_date}
            />
          </TMDBDetails>
        </GridCol>

        {reviews?.results && (
          <GridCol span={10}>
            <Reviews reviews={reviews?.results} />
          </GridCol>
        )}
      </Grid>
    </Container>
  );
};

export default TVDetailsPage;

const TVSubDetails = ({
  networks,
  first_air_date,
  last_air_date,
  number_of_seasons,
  number_of_episodes,
}: {
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
  last_air_date: string;
  networks: TVNetwork[];
}) => {
  return (
    <Stack>
      <Group>
        {networks.map((network: TVNetwork) => (
          <Image
            key={network.id}
            src={
              network.logo_path && TMDB_Image_Helper(network.logo_path, "w92")
            }
            alt={network.name}
          />
        ))}
      </Group>
      <Text>First Aired {first_air_date}</Text>
      <Text>Last Aired {last_air_date}</Text>
      <Text>Number of Seasons {number_of_seasons}</Text>
      <Text>Total Episodes {number_of_episodes}</Text>
    </Stack>
  );
};

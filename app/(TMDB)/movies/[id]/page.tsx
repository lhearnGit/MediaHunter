import { Movie } from "@/lib/entities/TMDB";
import { isValidMovie } from "@/lib/entities/TMDB/Movies/Movie";
import { TMDB_Fetch_Details } from "@/services/tmdb-api-client-v2";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";

import {
  Box,
  Container,
  Grid,
  GridCol,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notFound } from "next/navigation";
import CastGrid from "../../(TMDB)/_components/Cast/CastGrid";
import Reviews from "../../(TMDB)/_components/Review/Reviews";
import TMDBDetails from "../../(TMDB)/_components/TMDBDetails";

const append = "append_to_response=credits,reviews";

async function fetchDetails(id: number) {
  const result = await TMDB_Fetch_Details<Movie>({
    endpoint: `movie/${id}?${append}`,
  });
  const { success, data, error } = isValidMovie.safeParse(result);
  if (success) {
    return { ...data };
  } else {
    console.log(error);
    throw notFound();
  }
}

const MovieDetailsPage = async ({ params }: { params: { id: number } }) => {
  const {
    title,
    overview,
    budget,
    revenue,
    production_companies,
    release_date,
    reviews,
    credits,
    runtime,
    genres,
    backdrop_path,
    poster_path,
  } = await fetchDetails(params.id);

  return (
    <Container size={"xl"}>
      <Grid columns={12}>
        <GridCol span={12}>
          <Title>{title}</Title>
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
            title={title}
            poster_path={poster_path}
            genres={genres}
            companies={production_companies}
            updatePath="movies"
          >
            <MovieSubDetails
              release_date={release_date}
              revenue={revenue}
              runtime={runtime}
              budget={budget}
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

export default MovieDetailsPage;
interface Props {
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
}
const MovieSubDetails = ({ release_date, revenue, runtime, budget }: Props) => {
  return (
    <Box>
      <Text size="xl">Details</Text>
      <Stack justify="space-evenly" pl={30} pt={10}>
        <Box>
          <Text size="md">
            Release Date - {release_date ? release_date : "Not Yet Released"}
          </Text>
          <Text size="md">
            Runtime - {Math.round(runtime / 60)}h {runtime % 60}m
          </Text>
          <Text size="md"> Revenue - {revenue} </Text>
          <Text size="md">Budget {budget}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

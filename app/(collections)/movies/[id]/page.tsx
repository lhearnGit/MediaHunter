import {
  Cast,
  ProductionCompany,
  ReviewResponse,
  TMDB_Genre,
} from "@/lib/entities/TMDB";
import { fetchDetails } from "@/utils/fetches/TMDB/fetchDetails";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import {
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import CastGrid from "../../_components/TMDB/Cast/CastGrid";
import Reviews from "../../_components/TMDB/Reviews";
import DetailsSection from "../../shows/movies/_components/DetailsSection";

const append = "append_to_response=credits,reviews";
interface MovieDetails {
  id: number;

  title: string;
  original_title: string;

  status: string;
  release_date?: string;
  runtime: number; //length in minutes

  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];

  reviews: ReviewResponse;
  credits: { cast: Cast[] };

  overview: string;
  imdb_id: string;
  homepage: string;

  backdrop_path: string;
  poster_path: string;

  genres: TMDB_Genre[];
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
  } = await fetchDetails<MovieDetails>({
    endpoint: "movie",
    id: params.id,
    append: append,
  });

  return (
    <Container size={"xl"}>
      <Grid>
        <GridCol span={12} bg="dark">
          <Title>{title}</Title>
        </GridCol>
        <MainSection
          backdrop_path={backdrop_path}
          overview={overview}
          companies={production_companies}
        />
        <DetailsSection
          id={params.id}
          title={title}
          budget={budget}
          release_date={release_date}
          revenue={revenue}
          poster_path={poster_path}
          genres={genres}
          runtime={runtime}
        />

        <GridCol span={10}>
          <Title>Cast</Title>
        </GridCol>
        <CastSection cast={credits.cast} />
        <GridCol span={1} />
        <ReviewsSection reviews={reviews} />
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;

function MainSection({
  overview,
  backdrop_path,
  companies,
}: {
  backdrop_path: string;
  overview: string;
  companies: ProductionCompany[];
}) {
  return (
    <GridCol span={8}>
      <Stack px={5} py={10}>
        <Image
          src={TMDB_Image_Helper(backdrop_path, "original")}
          alt="no backdrop"
        />
        <Space h="l" />
        <Title>Summary</Title>
        <Text pl={10}>{overview}</Text>
        <Title>Produced By</Title>
        <SimpleGrid cols={2}>
          {companies.map((company: ProductionCompany) => (
            <Group key={company.id}>
              {company.logo_path && (
                <Image
                  src={TMDB_Image_Helper(company.logo_path, "w92")}
                  alt="failed to load"
                  bg={"white"}
                  p={5}
                  radius={"sm"}
                />
              )}
              <Text size="md">{company.name}</Text>
            </Group>
          ))}
        </SimpleGrid>
      </Stack>
    </GridCol>
  );
}

function ReviewsSection({ reviews }: { reviews: ReviewResponse }) {
  return (
    <GridCol span={12}>
      <Title>Reviews</Title>
      <Space h="xl" />
      <Reviews reviews={reviews.results} />
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

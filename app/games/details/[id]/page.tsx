import { auth } from "@/auth";
import { Game, IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import { isValidGame } from "@/lib/entities/IGDB/Game";

import { GameDataFields } from "@/fetches/IGDB/Queries/GameDataQueryFields";
import { fetchUserCollection } from "@/fetches/Server/fetchUserCollection";
import StyledBadges from "@/lib/ui/StyledBadges";
import {
  IGDB_Fetch_Details,
  IGDB_Request,
} from "@/services/igdb-api-client-v2";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import {
  Container,
  Grid,
  GridCol,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AboutDevelopers,
  AboutGame,
  AvailableDLC,
  OnPlatforms,
  ScreenshotsAndVideo,
  SimilarGames,
} from "./_components";
import AddToUserList from "./_components/AddToUserList";

async function fetchGameDetails(id: number) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `${GameDataFields}
      where id=${id};`,
  };

  const game = await IGDB_Fetch_Details<Game>(request);

  console.log(game);
  const { success, data, error } = isValidGame.safeParse(game);

  if (success) {
    console.log(success);

    return data;
  } else {
    console.log(error);
  }
}

const GamesDetailsPage = async ({ params }: { params: { id: number } }) => {
  const game = await fetchGameDetails(params.id);
  if (!game) return notFound();

  const session = await auth();

  const {
    name,
    summary,
    cover,
    storyline,
    genres,
    themes,
    involved_companies: companies,
    rating,
    rating_count,
    aggregated_rating,
    aggregated_rating_count,
    platforms,
    screenshots,
    videos,
    similar_games,
    dlcs,
  } = game;

  console.log(cover?.url);
  return (
    <Container size={"xl"}>
      <Grid columns={12}>
        <GridCol span={12}>
          <Group justify="space-between">
            <Title>{name}</Title>
            {session && (
              <AddToUserList
                id={params.id}
                name={name}
                imageUrl={
                  cover?.url
                    ? IGDB_Image_Helper(cover?.url, "cover_big")
                    : undefined
                }
                userId={session.user.id}
                endpoint="games"
              />
            )}
          </Group>
          <Space h="xl" />
        </GridCol>

        <GridCol span={8}>
          <AboutGame
            summary={summary}
            storyline={storyline}
            genres={genres}
            themes={themes}
          />
          <ScreenshotsAndVideo screenshots={screenshots} videos={videos} />
        </GridCol>

        <GridCol span={4}>
          {cover?.url && (
            <Image
              height={300}
              width={200}
              src={IGDB_Image_Helper(cover.url, "1080p")}
              alt="?"
            />
          )}
          {platforms && <OnPlatforms platforms={platforms} />}

          <AboutDevelopers companies={companies} />
          <Ratings
            rating={rating}
            rating_count={rating_count}
            aggregated_rating={aggregated_rating}
            aggregated_rating_count={aggregated_rating_count}
          />
        </GridCol>
        <GridCol span={8}>
          {dlcs && <AvailableDLC DLCSContents={dlcs} />}
        </GridCol>

        <GridCol span={12}>
          <Space h="xl" />
          {similar_games && <SimilarGames games={similar_games} />}
        </GridCol>
      </Grid>
    </Container>
  );
};

export default GamesDetailsPage;

const GenresAndThemes = ({
  genres,
  themes,
}: {
  genres: IGDB_Genre[] | undefined;
  themes: Theme[] | undefined;
}) => {
  return (
    <Stack>
      <Text size="lg">Genres & Themes</Text>
      <Group>
        {genres &&
          genres.map((genre: IGDB_Genre) => (
            <StyledBadges key={genre.id} label={genre.name} color="blue" />
          ))}
        {themes &&
          themes.map((theme: Theme) => (
            <StyledBadges key={theme.id} label={theme.name} color="blue" />
          ))}
      </Group>
    </Stack>
  );
};

const Ratings = ({
  rating,
  rating_count,
  aggregated_rating,
  aggregated_rating_count,
}: {
  rating: number | undefined;
  rating_count: number | undefined;
  aggregated_rating: number | undefined;
  aggregated_rating_count: number | undefined;
}) => {
  return (
    <Stack>
      <Text size="lg">Ratings</Text>
      <Group justify="space-between">
        {rating && rating_count ? (
          <div>
            <Text>Player Score</Text>
            <StyledBadges label={`${rating}% of ${rating_count}`} color="" />
          </div>
        ) : (
          <Text>No Player Ratings</Text>
        )}
        {aggregated_rating && aggregated_rating_count ? (
          <div>
            <Text>Critic Score</Text>
            <StyledBadges
              label={`Critic Score ${aggregated_rating}% of ${aggregated_rating_count}`}
              color=""
            />
          </div>
        ) : (
          <Text>No Critic Ratings</Text>
        )}
      </Group>
      <Space h="xl" />
    </Stack>
  );
};

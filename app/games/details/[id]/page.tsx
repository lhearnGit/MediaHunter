import {
  Theme,
  IGDB_Genre,
  Platform,
  Involved_Company,
  DLC,
  Similar_Game,
  Game,
  Video,
  ScreenShot,
} from "@/lib/entities/IGDB";
import { isValidGame } from "@/lib/entities/IGDB/Game";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";

import StyledBadges from "@/lib/ui/StyledBadges";
import VideoPlayer from "@/lib/ui/VideoPlayer/VideoPlayer";
import {
  IGDB_Fetch_Details,
  IGDB_Request,
} from "@/services/igdb-api-client-v2";
import { GameDataFields } from "@/utils/fetches/IGDB/Queries/GameDataQueryFields";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import {
  Container,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { round, sum } from "lodash";
import { createDynamicallyTrackedSearchParams } from "next/dist/client/components/search-params";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const {
    name,
    summary,
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
  return (
    <Container size={"xl"}>
      <Grid columns={12}>
        <GridCol span={12}>
          <Title>{name}</Title>
          <Space h="xl" />
        </GridCol>

        <GridCol span={8}>
          <About
            summary={summary}
            storyline={storyline}
            genres={genres}
            themes={themes}
          />
          <Media screenshots={screenshots} videos={videos} />
        </GridCol>

        <GridCol span={4}>
          <AvailablePlatforms platforms={platforms} />

          <DeveloperDetails companies={companies} />
          <Ratings
            rating={rating}
            rating_count={rating_count}
            aggregated_rating={aggregated_rating}
            aggregated_rating_count={aggregated_rating_count}
          />
        </GridCol>
        <GridCol span={8}>{dlcs && <DLCContent DLCSContents={dlcs} />}</GridCol>

        <GridCol span={12}>
          <Space h="xl" />
          {similar_games && <SimilarGames games={similar_games} />}
        </GridCol>
      </Grid>
    </Container>
  );
};

export default GamesDetailsPage;

interface AboutProps {
  genres: IGDB_Genre[] | undefined;
  themes: Theme[] | undefined;
  summary: string | undefined;
  storyline: string | undefined;
}
const About = ({ genres, themes, summary, storyline }: AboutProps) => {
  return (
    <>
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
      <Space h={"xl"} />
      <Title mb={"md"}>Summary</Title>
      <Text mb={10}>{summary}</Text>
      {storyline != summary && storyline ? <Text>{storyline}</Text> : <></>}
    </>
  );
};
interface MediaProps {
  screenshots: ScreenShot[] | undefined;
  videos: Video[] | undefined;
}
const Media = ({ screenshots, videos }: MediaProps) => {
  return (
    <Stack>
      {screenshots && <Title>Screenshots</Title>}
      {videos && (
        <Stack>
          <Title>Video</Title>
          <VideoPlayer videos={videos} />
        </Stack>
      )}
    </Stack>
  );
};

const DLCContent = ({ DLCSContents }: { DLCSContents: DLC[] }) => {
  return (
    <Stack>
      <Text size="lg">DLC</Text>
      <SimpleGrid cols={4}>
        {DLCSContents.map(({ id, name, total_rating, cover }: DLC) => (
          <Stack key={id}>
            <p>{name}</p>
            <ImageLink
              height={160}
              poster={{
                id: id,
                name: name,
                imageUrl: cover?.url
                  ? IGDB_Image_Helper(cover?.url, "720p")
                  : "/images/notfound.jpg",
              }}
              pathname="games/details"
            />
            {total_rating ? (
              <StyledBadges
                label={`Rating ${round(total_rating, 1)}`}
                color=""
              />
            ) : (
              <StyledBadges label={`No Rating Available`} color="" />
            )}
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
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

const AvailablePlatforms = ({ platforms }: { platforms: Platform[] }) => {
  return (
    <Stack>
      <Text size="lg">Playable On</Text>
      <Group>
        {platforms &&
          platforms.map((platform: Platform) => (
            <StyledBadges
              key={platform.id}
              label={platform.name}
              color="blue"
            />
          ))}
      </Group>
      <Space h="xl" />
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

const SimilarGames = ({ games }: { games: Similar_Game[] }) => {
  if (!games) return <></>;
  return (
    <>
      <Title mb={"lg"}>Similar Games</Title>
      <Group>
        {games.map(({ id, cover }: Similar_Game) => (
          <Link key={id} href={`/games/${id}`}>
            <ImageLink
              height={160}
              poster={{
                id: id,
                name: "a",
                imageUrl: cover?.url
                  ? IGDB_Image_Helper(cover?.url, "720p")
                  : "images/notfound.jpg",
              }}
              pathname="games/details"
            />
          </Link>
        ))}
      </Group>
    </>
  );
};

const DeveloperDetails = ({
  companies,
}: {
  companies?: Involved_Company[];
}) => {
  if (!companies)
    return (
      <Stack>
        <Text size="lg">Publishing & Developers Info Unavailable</Text>
      </Stack>
    );
  return (
    <Stack>
      <Text size="lg">Publishing & Developers</Text>
      <Grid columns={4}>
        {companies.map(({ id, company, publisher }: Involved_Company) => (
          <GridCol key={id} span={2}>
            <Stack>
              <Text>
                {publisher ? "Developer " : " Publisher "} {company.name}
              </Text>
              <Image
                height={64}
                width={64}
                src={
                  company.logo?.url
                    ? IGDB_Image_Helper(company.logo.url, "1080p")
                    : "/images/notfound.jpg"
                }
                className="bg-inherit"
                alt="No Image found"
              />
            </Stack>
          </GridCol>
        ))}
      </Grid>
      <Space h="xl" />
    </Stack>
  );
};

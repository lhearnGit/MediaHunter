import { IGDB_Genre, Platform, Theme } from "@/lib/entities/IGDB";
import { DLC, Game_Cover, Involved_Company } from "@/lib/entities/IGDB/Games";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";

import StyledBadges from "@/lib/ui/StyledBadges";
import { fetchGameDetails } from "@/utils/fetches/IGDB/fetchGameDetails";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { Grid, GridCol, Group, Space, Stack, Text, Title } from "@mantine/core";
import { round } from "lodash";
import Image from "next/image";
import Link from "next/link";

const GamesDetailsPage = async ({ params }: { params: { id: number } }) => {
  const {
    // cover,
    name,
    genres,
    themes,
    platforms,
    rating,
    rating_count,
    aggregated_rating,
    aggregated_rating_count,
    summary,
    storyline,
    // videos,
    //  screenshots,
    similar_games,
    dlcs,
    companies,
  } = await fetchGameDetails(params.id);

  return (
    <Grid>
      <GridCol span={12}>
        <Group justify="space-between">
          <Title>{name}</Title>
        </Group>
        <Space h="xl" />
      </GridCol>
      <GridCol span={8}>
        <Grid columns={8}>
          <GridCol span={7}>
            <Title mb={"md"}>Summary</Title>
            <Text mb={10}>{summary}</Text>
            {storyline != summary && storyline ? (
              <Text>{storyline}</Text>
            ) : (
              <></>
            )}
            <br />
          </GridCol>
          <GridCol span={4}>
            <GenresAndThemes genres={genres} themes={themes} />
            <AvailablePlatforms platforms={platforms} />
          </GridCol>
        </Grid>
        {dlcs && <DLCContent content={dlcs} />}
      </GridCol>
      <GridCol offset={1} span={3}>
        <Ratings
          rating={rating}
          rating_count={rating_count}
          aggregated_rating={aggregated_rating}
          aggregated_rating_count={aggregated_rating_count}
        />
        <ReleaseDates />
        <Companies companies={companies} />
      </GridCol>

      <GridCol span={12}>
        <SimilarGames games={similar_games} />
      </GridCol>
    </Grid>
  );
};

export default GamesDetailsPage;

//          <GridCol span={4}>{videos && <VideoPlayer videos={videos} />}</GridCol>

const DLCContent = ({ content }: { content: DLC[] }) => {
  return (
    <Stack>
      <Text size="lg">DLC</Text>
      <Grid columns={4}>
        {content.map(({ id, name, total_rating, cover }: DLC) => (
          <GridCol key={id} span={1}>
            <Stack>
              <ImageLink
                height={160}
                poster={{
                  id: id,
                  name: name,
                  imageUrl: cover?.url
                    ? IGDB_Image_Helper(cover?.url, "720p")
                    : "images/notfound.jpg",
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
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
};
const GenresAndThemes = ({
  genres,
  themes,
}: {
  genres: IGDB_Genre[];
  themes: Theme[];
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
    </Stack>
  );
};

const Ratings = ({
  rating,
  rating_count,
  aggregated_rating,
  aggregated_rating_count,
}: {
  rating: number;
  rating_count: number;
  aggregated_rating: number;
  aggregated_rating_count: number;
}) => {
  return (
    <Stack>
      <Text size="lg">Ratings</Text>
      <Group justify="space-between">
        <div>
          <Text>Player Score</Text>
          <StyledBadges label={`${rating}% of ${rating_count}`} color="" />
        </div>
        <div>
          <Text>Critic Score</Text>
          <StyledBadges
            label={`Critic Score ${aggregated_rating}% of ${aggregated_rating_count}`}
            color=""
          />
        </div>
      </Group>
    </Stack>
  );
};

const ReleaseDates = () => {
  const releases = [1, 2, 3, 4];
  return (
    <Stack>
      <Text size="lg">Releases</Text>
      <Group justify="space-between">
        {releases.map((release: number) => (
          <p key={release}>{release}</p>
        ))}
      </Group>
    </Stack>
  );
};
const SimilarGames = ({ games }: { games: Game_Cover[] }) => {
  return (
    <>
      <Title mb={"lg"}>Similar Games</Title>
      <Group>
        {games.map(({ id, cover, name }: Game_Cover) => (
          <Link key={id} href={`/games/${id}`}>
            <ImageLink
              height={160}
              poster={{
                id: id,
                name: name,
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
const Companies = ({ companies }: { companies: Involved_Company[] }) => {
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
    </Stack>
  );
};

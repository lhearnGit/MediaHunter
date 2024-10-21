"use client";
import { signIn } from "@/auth";
import { useProfileList } from "@/lib/hooks/profile/useProfileList";
import {
  Card,
  Grid,
  Image,
  Skeleton,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
interface ShowResponse {
  name: string;
  id: number;
  imageUrl: string;
}

const UserShowsPage = () => {
  const { data, status } = useSession();
  if (!data) return signIn();
  const { profile, isLoading, isFetching, error } = useProfileList(
    data?.user.id
  );

  console.log(profile);
  if (isLoading) return <Skeleton />;
  if (isFetching) return <Skeleton />;
  const { movies, shows } = profile;

  const recentMovies = movies.slice(0, 5);
  const recentShows = shows.slice(0, 5);
  return (
    <>
      <Title>User Shows Page</Title>
      <Space h="xl" />
      <Stack>
        <Title>Section Title</Title>

        <ProfileContentGrid
          path="movies"
          items={movies}
          gridTitle="All Movies"
        />
        <ProfileContentGrid path="tv" items={shows} gridTitle="All Shows" />
      </Stack>
    </>
  );
};

export default UserShowsPage;

function ProfileContentGrid({
  gridTitle,
  path,
  items,
}: {
  gridTitle: string;
  path: "tv" | "game" | "movies";
  items: ShowResponse[];
}) {
  return (
    <Grid grow gutter={"md"}>
      <Grid.Col span={12}>
        <Title size={"xl"}>{gridTitle}</Title>
      </Grid.Col>
      <Grid.Col span={1} />
      {items.slice(0, 5).map(({ id, name, imageUrl }) => (
        <Grid.Col key={id} bg={"black"} span={2}>
          <LinkCard
            path="movies"
            id={id}
            title={name}
            image={imageUrl && imageUrl}
          />
        </Grid.Col>
      ))}
      <Grid.Col span={1} />
    </Grid>
  );
}

function LinkCard({
  path,
  id,
  title,
  image,
}: {
  path: string;
  title: string;
  id: number | string;
  image?: string;
}) {
  return (
    <Link replace href={`/shows/${path}/${id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} alt={title} />
        </Card.Section>
      </Card>
    </Link>
  );
}

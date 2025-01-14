import { useProfileList } from "@/lib/hooks/profile/useProfileList";
import { Skeleton, Grid, Title, Image, Card } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
interface ShowResponse {
  name: string;
  id: number;
  imageUrl: string;
}
export default function ProfileContentGrid({
  gridTitle,
  path,
  items,
}: {
  gridTitle: string;
  path: "tv" | "game" | "movies";
  items: ShowResponse[];
}) {
  const { data } = useSession();
  if (data == null) return signIn();
  const { profile, isLoading, isFetching } = useProfileList(data.user.id);

  console.log(profile);
  if (isLoading) return <Skeleton />;
  if (isFetching) return <Skeleton />;
  const { movies, shows } = profile;
  return (
    <Grid grow gutter={"md"}>
      <Grid.Col span={12}>
        <Title size={"xl"}>{gridTitle}</Title>
      </Grid.Col>
      <Grid.Col span={1} />
      {items.slice(0, 5).map(({ id, name, imageUrl }) => (
        <Grid.Col key={id} bg={"black"} span={2}>
          <LinkCard
            path={path}
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

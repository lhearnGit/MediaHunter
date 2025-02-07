import SignInPage from "@/app/signin/page";
import { auth } from "@/auth";
import { fetchUserCollection } from "@/fetches/Server/fetchUserCollection";
import { Poster } from "@/lib/entities/Poster";
import { UserCollection } from "@/lib/hooks/profile/useGetUserCollection";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { Title, Space, Stack, SimpleGrid } from "@mantine/core";
import React from "react";

const UserGamesPage = async () => {
  const session = await auth();
  if (!session)
    return SignInPage({ searchParams: { callbackUrl: "/user/games" } });

  const collection: UserCollection | null = await fetchUserCollection();
  if (!collection)
    return (
      <div>
        <p>find some games</p>
      </div>
    );
  const { games } = collection;
  console.debug(games);

  return (
    <>
      <Title>User Games Page</Title>
      <Space h="xl" />
      <Stack>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }}>
          {games &&
            games.map((game: Poster) => (
              <ImageLink
                key={game.id}
                pathname={"games/details"}
                poster={game}
                height={264}
                width={196}
              />
            ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default UserGamesPage;

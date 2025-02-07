import SignInPage from "@/app/signin/page";
import { auth } from "@/auth";
import { fetchUserCollection } from "@/fetches/Server/fetchUserCollection";
import { Poster } from "@/lib/entities/Poster";
import { UserCollection } from "@/lib/hooks/profile/useGetUserCollection";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { Title, Space, Stack, SimpleGrid } from "@mantine/core";
import React from "react";

const UserMoviesPage = async () => {
  const session = await auth();
  if (!session)
    return SignInPage({ searchParams: { callbackUrl: "/user/movies" } });

  const collection: UserCollection | null = await fetchUserCollection();
  if (!collection)
    return (
      <div>
        <p>find some movies</p>
      </div>
    );
  const { movies } = collection;
  console.debug(movies);

  return (
    <>
      <Title>User Movies Page</Title>
      <Space h="xl" />
      <Stack>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }}>
          {movies &&
            movies.map((movieposter: Poster) => (
              <ImageLink
                key={movieposter.id}
                pathname={"movies"}
                poster={movieposter}
                height={264}
                width={196}
              />
            ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default UserMoviesPage;

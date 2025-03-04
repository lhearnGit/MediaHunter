import SignInPage from "@/app/signin/page";
import { auth } from "@/auth";
import { fetchUserCollection } from "@/fetches/Server/fetchUserCollection";
import { Poster } from "@/lib/entities/Poster";
import { UserCollection } from "@/lib/hooks/profile/useGetUserCollection";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { SimpleGrid, Space, Stack, Title } from "@mantine/core";

const UserShowsPage = async () => {
  const session = await auth();
  if (!session)
    return SignInPage({ searchParams: { callbackUrl: "/user/games" } });

  const collection: UserCollection | null = await fetchUserCollection();
  if (!collection)
    return (
      <div>
        <p>find some shows</p>
      </div>
    );
  const { tvShows: shows } = collection;
  console.debug(shows);
  return (
    <>
      <Title>User Shows Page</Title>
      <Space h="xl" />
      <Stack>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }}>
          {shows &&
            shows.map((show: Poster) => (
              <ImageLink
                key={show.id}
                pathname={"tv"}
                poster={show}
                height={264}
                width={196}
              />
            ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default UserShowsPage;

import { auth } from "@/auth";
import SignInPage from "../signin/page";
import { SimpleGrid, Container, Title, Text } from "@mantine/core";
import Link from "next/link";
import { UserCollection } from "@/lib/hooks/profile/useGetUserCollection";
import { fetchUserCollection } from "@/fetches/Server/fetchUserCollection";
interface SubPage {
  href: string;
  heading: string;
}
const SubPages: SubPage[] = [
  { heading: "Profile Settings", href: "profile" },
  { heading: "Games", href: "games" },
  { heading: "Movies", href: "movies" },
  { heading: "TV Shows", href: "shows" },
];
const UserDashboard = async () => {
  const session = await auth();
  if (!session) return SignInPage({ searchParams: { callbackUrl: "/user" } });
  const collection: UserCollection | null = await fetchUserCollection();

  console.debug(collection);
  return (
    <div>
      <Container size={"xl"} my={40}>
        <Title ta={"center"} mt={40}>
          Welcome! {session.user.name}
        </Title>
        <SimpleGrid
          cols={2}
          spacing={40}
          m={"auto"}
          py={40}
          maw={800}
          ta={"left"}
        >
          {SubPages.map(({ heading, href }: SubPage) => (
            <Link href={`/user/${href}`} key={href}>
              <Title ta={"left"}>{heading}</Title>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default UserDashboard;

import { auth } from "@/auth";
import { UserCollections } from "@/lib/hooks/profile/useGetUserCollection";
import SignInPage from "../signin/page";
import { SimpleGrid, Container, Title, Text } from "@mantine/core";
import Link from "next/link";
interface ContentProps {
  content: string;
  heading: string;
}
const contents: ContentProps[] = [
  { heading: "Profile Settings", content: "123" },
  { heading: "Games", content: "321" },
  { heading: "Movies", content: "422" },
  { heading: "TV Shows", content: "555" },
];
const UserDashboard = async () => {
  const session = await auth();
  if (!session) return SignInPage({ searchParams: { callbackUrl: "/user" } });
  const profile: UserCollections = await fetch(
    `${process.env.SERVER_ROOT}/api/user/${session.user.id}`
  ).then((res) => res.json());

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
          {contents.map(({ heading, content }: ContentProps) => (
            <ContentSection key={heading} heading={heading} content={content} />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default UserDashboard;

const ContentSection = ({ heading, content }: ContentProps) => {
  return (
    <Link href={"/user/shows"}>
      <Title ta={"left"}>{heading}</Title>
      <Text>{content}</Text>
    </Link>
  );
};

import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { Stack, Group, Space, Title, Text } from "@mantine/core";

interface AboutProps {
  genres: IGDB_Genre[] | undefined;
  themes: Theme[] | undefined;
  summary: string | undefined;
  storyline: string | undefined;
}
const AboutGame = ({ genres, themes, summary, storyline }: AboutProps) => {
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

export default AboutGame;

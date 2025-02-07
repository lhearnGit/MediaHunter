import { Similar_Game } from "@/lib/entities/IGDB";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { Title, Group } from "@mantine/core";

const SimilarGames = ({ games }: { games: Similar_Game[] }) => {
  if (!games) return <></>;
  return (
    <>
      <Title mb={"lg"}>Similar Games</Title>
      <Group>
        {games.map(({ id, cover }: Similar_Game) => (
          <ImageLink
            key={id}
            height={196}
            width={144}
            poster={{
              id: id,
              name: "similargame",
              imageUrl: cover?.url
                ? IGDB_Image_Helper(cover?.url, "720p")
                : "/images/notfound.jpg",
            }}
            pathname="games/details"
          />
        ))}
      </Group>
    </>
  );
};

export default SimilarGames;

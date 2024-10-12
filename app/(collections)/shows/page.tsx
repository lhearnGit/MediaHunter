import ItemCard from "@/lib/ui/Card/CardLink";
import { TopFive } from "@/utils/fetches/TMDB/fetchTopFive";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { SimpleGrid, Space, Text } from "@mantine/core";

interface Poster {
  id: number;
  title: string;
  image?: string;
}
const ShowsHome = async () => {
  return (
    <div>
      <Text>Grouping Heading</Text>
      <Space h="md" />
      <ShowsContent
        mediaType="movies"
        items={await TopFive("movie/top_rated")}
      />
      <ShowsContent mediaType="movies" items={await TopFive("movie/popular")} />

      <Text>Grouping Heading</Text>
      <Space h="md" />
      <ShowsContent mediaType="tv" items={await TopFive("tv/top_rated")} />
      <ShowsContent mediaType="tv" items={await TopFive("tv/popular")} />
    </div>
  );
};

export default ShowsHome;

const ShowsContent = ({
  items,
  mediaType,
}: {
  items: Poster[];
  mediaType: "movies" | "tv" | "game";
}) => {
  return (
    <>
      <Text>Section Heading</Text>
      <Space h="md" />
      <SimpleGrid cols={5}>
        {items.map(({ id, title, image }) => (
          <ItemCard
            key={id}
            id={id}
            title={title}
            mediaType={mediaType}
            image={image && TMDB_Image_Helper(image)}
          />
        ))}
      </SimpleGrid>
      <Space h="md" />
    </>
  );
};

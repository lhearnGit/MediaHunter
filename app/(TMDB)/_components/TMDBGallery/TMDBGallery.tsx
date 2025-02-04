import Poster from "@/lib/entities/Poster";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";

import { Container, SimpleGrid } from "@mantine/core";
const TMDBGallery = ({
  posters,
  pathname,
}: {
  posters: Poster[];
  pathname: "tv" | "movies";
}) => {
  if (posters.length == 0) return <p> No Results </p>;
  return (
    <Container size={"lg"} py={20}>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }}>
        {posters.map((poster: Poster) => (
          <ImageLink
            height={240}
            pathname={pathname}
            poster={{
              ...poster,
              imageUrl: poster.imageUrl
                ? TMDB_Image_Helper(poster.imageUrl, "original")
                : "/images/notfound.jpg",
            }}
            key={poster.id}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TMDBGallery;

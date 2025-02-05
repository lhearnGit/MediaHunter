import Poster from "@/lib/entities/Poster";
import { Container, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import classes from "./TMDBGallery.module.css";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
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
          <Link
            className={classes.link}
            key={poster.id}
            href={`/${pathname}/${poster.id}`}
          >
            <Image
              className={classes.image}
              height={264}
              width={196}
              src={
                poster.imageUrl
                  ? TMDB_Image_Helper(poster.imageUrl, "w500")
                  : "/images/notfound.jpg"
              }
              alt={`${poster.name}`}
            />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TMDBGallery;

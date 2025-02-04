import Poster from "@/lib/entities/Poster";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import React from "react";

import classes from "./tmdbgallery.module.css";
import { Container } from "@mantine/core";
const TMDBGallery = ({
  posters,
  pathname,
}: {
  posters: Poster[];
  pathname: "tv" | "movies";
}) => {
  if (posters.length == 0) return <p> No Results </p>;
  return (
    <Container size={"xl"}>
      <div className={classes.cardContainer}>
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
      </div>
    </Container>
  );
};

export default TMDBGallery;

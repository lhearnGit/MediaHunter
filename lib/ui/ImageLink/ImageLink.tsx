import Poster from "@/lib/entities/Poster";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import classes from "./ImageLink.module.css";
const ImageLink = ({
  height,
  poster,
  pathname,
}: {
  height: 160 | 360 | number;
  poster: Poster;
  pathname: "games/details" | "movies" | "tv";
}) => {
  const width = height * (2 / 3);
  return (
    <Link
      className={classes.link}
      key={poster.id}
      href={`/${pathname}/${poster.id}`}
    >
      <Image
        className={classes.image}
        height={height}
        width={width}
        src={poster.imageUrl ? poster.imageUrl : "/images/notfound.jpg"}
        alt={`${poster.name}`}
      />
    </Link>
  );
};

export default ImageLink;

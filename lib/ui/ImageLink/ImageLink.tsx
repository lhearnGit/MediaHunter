import Poster from "@/lib/entities/Poster";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Image_Helper from "@/utils/helpers/Image_Helper";
import classes from "./ImageLink.module.css";
const ImageLink = ({
  height,
  poster,
  pathname,
}: {
  height: 160 | 360 | number;
  poster: Poster;
  pathname: "games" | "movies" | "tv";
}) => {
  return (
    <div className={classes.wrapper}>
      <Link
        className={classes.link}
        key={poster.id}
        href={`/${pathname}/${poster.id}`}
      >
        <Image
          className={classes.image}
          height={height}
          width={height * (2 / 3)}
          src={
            poster.imageUrl
              ? Image_Helper({ type: "TMDB", url: poster.imageUrl })
              : "/images/notfound.jpg"
          }
          alt="no image"
        />
      </Link>
    </div>
  );
};

export default ImageLink;

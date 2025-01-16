import Poster from "@/lib/entities/Poster";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";

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
    <Link key={poster.id} href={`/${pathname}/${poster.id}`}>
      <Image
        style={{
          borderRadius: 5,
          boxShadow: "2px 2px 2px black",
        }}
        height={height}
        width={height * (2 / 3)}
        src={
          poster.imageUrl
            ? IGDB_Image_Helper(poster.imageUrl, "720p")
            : "/images/notfound.jpg"
        }
        alt="no image"
      />
    </Link>
  );
};

export default ImageLink;

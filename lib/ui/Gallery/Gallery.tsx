"use client";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import React from "react";

const Gallery = ({ images }: { images: { id: number; url: string }[] }) => {
  return (
    <Carousel loop>
      {images.map(({ id, url }: { id: number; url: string }) => (
        <Carousel.Slide key={id}>
          <Image
            height={320}
            width={480}
            src={"https://" + IGDB_Image_Helper(url, "720p")}
            alt={"no image available"}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Gallery;

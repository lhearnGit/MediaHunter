"use client";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import React from "react";

const Gallery = ({ images }: { images: { id: number; url: string }[] }) => {
  return (
    <Carousel loop>
      {images.map(({ id, url }: { id: number; url: string }) => (
        <Carousel.Slide>
          <Image src={IGDB_Image_Helper(url, "720p")} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Gallery;

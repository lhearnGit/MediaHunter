"use client";
import { Carousel } from "@mantine/carousel";
import { HeroImageRight } from "../Sections/Headers/HeroImageRight";
import classes from "./Banner.module.css";
interface Banner {
  title: string;
  href: string;
  description: string;
  collectionType: string;
}
export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  return (
    <Carousel withIndicators classNames={classes}>
      {banners.map(
        ({ title, description, href, collectionType }: Banner, index) => (
          <Carousel.Slide key={index}>
            <HeroImageRight
              title={title}
              description={description}
              href={href}
              collectionType={collectionType}
            />
          </Carousel.Slide>
        )
      )}
    </Carousel>
  );
}

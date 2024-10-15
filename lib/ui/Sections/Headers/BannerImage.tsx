import { BackgroundImage, Title } from "@mantine/core";
import classes from "./bannerimage.module.css";

export function BannerImage({ title, url }: { title: string; url: string }) {
  return (
    <>
      <Title className={classes.title}>{title}</Title>
      <BackgroundImage
        id="backgroundImg"
        src={url}
        className={classes.wrapper}
        style={{ backgroundImage: `url(${url})` }}
      ></BackgroundImage>
    </>
  );
}

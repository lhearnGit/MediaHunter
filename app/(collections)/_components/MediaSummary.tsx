"use client";
import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { GridCol, Group, Stack, Text } from "@mantine/core";

import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import classes from "./MediaSummary.module.css";
interface SummaryProps {
  id: number;
  title: string;
  image: string;
  genres: IGDB_Genre[];
  themes: Theme[];
  rating: number;
  rating_count: number;
  summary: string;
}

const MediaSummary = ({
  id,
  title,
  image,
  genres,
  themes,
  summary,
  rating,
  rating_count,
}: SummaryProps) => {
  return (
    <Group className={classes.wrapper}>
      <ImageLink
        height={300}
        pathname="games"
        poster={{ id: id, imageUrl: image, name: title }}
      />
      <Stack className={classes.details}>
        <Group>
          <StyledBadges
            label={`ratings ${rating_count}`}
            color={rating > 75 ? "green" : "red"}
          />
          <StyledBadges
            label={`Player Score ${rating}`}
            color={rating > 75 ? "green" : "red"}
          />
        </Group>
        <Group className={classes.badges}>
          {themes &&
            themes.map((theme: Theme) => (
              <StyledBadges key={theme.id} label={theme.name} color="blue" />
            ))}
          {genres &&
            genres.map((genre: IGDB_Genre) => (
              <StyledBadges key={genre.id} label={genre.name} color="blue" />
            ))}
        </Group>
        <Text mt={"lg"} lineClamp={4}>
          {summary}
        </Text>
      </Stack>
    </Group>
  );
};

export default MediaSummary;

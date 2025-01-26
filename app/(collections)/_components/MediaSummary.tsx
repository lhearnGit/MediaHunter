"use client";
import { IGDB_Genre, Platform, Theme } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { Group, Stack, Text } from "@mantine/core";

import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import classes from "./MediaSummary.module.css";
import PlatformIcons from "../games/_component/PlatformIcons/PlatformIcons";
interface SummaryProps {
  id: number;
  title: string;
  image: string;
  genres: IGDB_Genre[];
  themes: Theme[];
  rating: number;
  rating_count: number;
  summary: string;

  platforms: Platform[];
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
  platforms,
}: SummaryProps) => {
  return (
    <Group className={classes.wrapper}>
      <ImageLink
        height={300}
        pathname="games/details"
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
        <Group>
          {platforms &&
            platforms.map((platform: Platform) => (
              <PlatformIcons
                showName={true}
                key={platform.id}
                platform={platform}
              />
            ))}
        </Group>
      </Stack>
    </Group>
  );
};

export default MediaSummary;

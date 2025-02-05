"use client";
import { IGDB_Genre, Platform, Theme } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { Group, Stack, Text } from "@mantine/core";

import classes from "./MediaSummary.module.css";
import PlatformIcons from "../../games/_component/PlatformIcons/PlatformIcons";
import Link from "next/link";
import Image from "next/image";

interface SummaryProps {
  id: number;
  title: string;
  image: string;
  genres: IGDB_Genre[] | undefined;
  themes: Theme[] | undefined;
  rating?: number;
  rating_count?: number;
  summary?: string;

  platforms?: Platform[];
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
      <Stack>
        <Link className={classes.link} key={id} href={`/games/details/${id}`}>
          <Image
            className={classes.image}
            height={224}
            width={148}
            src={image ? image : "/images/notfound.jpg"}
            alt={`${title} cover image`}
          />
        </Link>
      </Stack>
      <Stack className={classes.details}>
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
        <Group mb={0}>
          {platforms &&
            platforms.map((platform: Platform) => (
              <PlatformIcons
                showName={false}
                key={platform.id}
                platform={platform}
              />
            ))}
        </Group>
        <Text mt={"lg"} lineClamp={4}>
          {summary}
        </Text>
        <Group>
          {rating && (
            <StyledBadges
              label={rating ? `ratings ${rating_count}` : "no ratings"}
              color={"green"}
            />
          )}
          <StyledBadges
            label={rating ? `Player Score ${rating}` : `No Score`}
            color={rating ? "green" : "red"}
          />
        </Group>
      </Stack>
    </Group>
  );
};

export default MediaSummary;

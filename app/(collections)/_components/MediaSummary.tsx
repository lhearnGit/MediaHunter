"use client";
import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";

import { Grid, GridCol, Group, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
interface SummaryProps {
  id: number | string;
  title: string;
  image: string;
  genres: IGDB_Genre[];
  themes: Theme[];
  rating: number;
  rating_count: number;
  pagePath: string;
  summary: string;
}
export const MediaSummary = ({
  id,
  title,
  image,
  genres,
  themes,
  summary,
  pagePath,
  rating,
  rating_count,
}: SummaryProps) => {
  return (
    <Grid columns={9} gutter={"md"} mx={"sm"} m={"md"}>
      <GridCol span={5}>
        <Group justify="space-between" pr={"lg"}>
          <Text key={id} size="xl">
            <Link href={`${pagePath}/${id}`} className="no-underline">
              {title}
            </Link>
          </Text>
        </Group>
      </GridCol>
      <GridCol span={4} />
      <GridCol span={1} mr={"xl"}>
        <Image width={140} height={200} src={image} alt="no image found" />
      </GridCol>
      <GridCol span={5}>
        <Group pb={10}>
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
      </GridCol>
      <GridCol span={6}>
        <Group justify="flex-end">
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
          <Link href={`${pagePath}/${id}`} className="underline-offset-1">
            Read More
          </Link>
        </Group>
      </GridCol>
    </Grid>
  );
};

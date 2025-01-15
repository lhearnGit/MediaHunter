"use client";
import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import addToCollection from "@/lib/hooks/profile/addToCollection";
import StyledBadges from "@/lib/ui/StyledBadges";
import { Grid, GridCol, Group, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
interface SummaryProps {
  id: number;
  title: string;
  image: string;
  genres: IGDB_Genre[];
  themes: Theme[];
  rating: number;
  rating_count: number;
  pagePath: string;
  summary: string;
}
interface ProfileData {
  userId: string;
  endpoint: "games" | "movies" | "shows";
  data: { id: number; name: string; url: string };
  addTo: boolean;
}

const MediaSummary = ({
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
  const addToCollection = useMutation({
    mutationFn: ({ userId, endpoint, data, addTo }: ProfileData) => {
      return axios.patch("/api/user/" + userId + `/${endpoint}`, {
        data,
        addTo,
      });
    },
  });

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
        <Image
          style={{
            borderRadius: 5,
            boxShadow: "2px 2px 2px black",
          }}
          width={140}
          height={200}
          src={image}
          alt="no image found"
        />
      </GridCol>
      <GridCol span={7}>
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
            <button
              onClick={() => {
                addToCollection.mutate({
                  addTo: true,
                  endpoint: "games",
                  userId: "66d73678a5ae02f237ead4d9",
                  data: { id: id, url: image, name: title },
                });
              }}
            >
              Add To Collection
            </button>
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

export default MediaSummary;

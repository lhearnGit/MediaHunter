"use client";
import { Episode, Season } from "@/lib/entities/TMDB";
import { Space, Text, Title } from "@mantine/core";
import SeasonsSection from "./SeasonsSection";
import EpisodesSection from "./EpisodesSection";

export default function MainSection({
  summary,
  seasons,
  episodes,
}: {
  summary: string;
  seasons?: Season[];
  episodes?: Episode[];
}) {
  return (
    <>
      <Space h="xl" />
      <Title>Summary</Title>
      <Text>{summary}</Text>
      <SeasonsSection seasons={seasons} />
      {episodes && <EpisodesSection episodes={episodes} />}
    </>
  );
}

import { Episode } from "@/lib/entities/TMDB";
import { Title } from "@mantine/core";
import React from "react";

const EpisodeDetails = ({ episode }: { episode: Episode }) => {
  return (
    <div>
      <Title>{episode.name}</Title>
    </div>
  );
};

export default EpisodeDetails;

import { Episode } from "@/lib/entities/TMDB";
import React from "react";

const EpisodesSection = ({ episodes }: { episodes: Episode[] }) => {
  console.log(episodes);
  return <div>{episodes.length}</div>;
};

export default EpisodesSection;

"use client";
import { useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "./episodes.module.css";
import { Episode } from "@/lib/entities/TMDB";
import EpisodeDetails from "./EpisodeDetails";

export default function episodesMenu({ episodes }: { episodes: Episode[] }) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = episodes.map((episode: Episode) => (
    <UnstyledButton
      key={episode.id}
      className={classes.control}
      ref={setControlRef(episode.episode_number)}
      onClick={() => setActive(episode.episode_number)}
      mod={{ active: active === episode.episode_number }}
    >
      <span className={classes.controlLabel}>{episode.name}</span>
    </UnstyledButton>
  ));

  return (
    <>
      <div className={classes.root} ref={setRootRef}>
        {controls}
        <FloatingIndicator
          target={controlsRefs[active]}
          parent={rootRef}
          className={classes.indicator}
        />
      </div>
      <div>
        <EpisodeDetails episode={episodes[active]} />
      </div>
    </>
  );
}

"use client";
import { Season } from "@/lib/entities/TMDB";
import classes from "@/lib/ui/FloatingTabs/floatingtabs.module.css";
import { FloatingIndicator, Grid, Space, Tabs, Title } from "@mantine/core";
import { useState } from "react";
import SeasonDetails from "./SeasonDetails";

const SeasonsMenu = ({ seasons }: { seasons?: Season[] }) => {
  if (!seasons) return <div>no seasons</div>;
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>(seasons[0].id.toString());
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        {seasons.map((season: Season) => (
          <Tabs.Tab
            key={season.id}
            value={season.season_number.toString()}
            ref={setControlRef(season.season_number.toString())}
            className={classes.tab}
          >
            {season.name}
          </Tabs.Tab>
        ))}
        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>
      {seasons.map((season: Season) => (
        <Tabs.Panel
          key={season.season_number}
          value={season.season_number.toString()}
        >
          <SeasonDetails season={season} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default SeasonsMenu;

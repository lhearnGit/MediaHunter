"use client";
import { act, useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "./seasonsfloating.module.css";
import { Season } from "@/lib/entities/TMDB";
import SeasonDetails from "./SeasonDetails";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

export default function SeasonsMenu({ seasons }: { seasons: Season[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  function HandleSeasonChange(season_number: number) {
    setActive(season_number);
    if (season_number == active) {
      console.log("same");
    } else {
      console.log("changed");

      const query = new URLSearchParams(searchParams);
      if (query.get("season") == null) {
        query.append("season", season_number.toString());
      } else {
        query.set("season", season_number.toString());
      }
      return router.replace(`${pathname}?${query.toString()}`, {
        scroll: false,
      });
    }
  }

  const controls = seasons.map((season: Season) => (
    <UnstyledButton
      key={season.id}
      className={classes.control}
      ref={setControlRef(season.season_number)}
      onClick={debounce(() => HandleSeasonChange(season.season_number), 300)}
      mod={{ active: active === season.season_number }}
    >
      <span className={classes.controlLabel}>{season.name}</span>
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
        <SeasonDetails season={seasons[active]} />
      </div>
    </>
  );
}

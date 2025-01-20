"use client";
import { Cast } from "@/lib/entities/TMDB";
import { Button, Grid, GridCol } from "@mantine/core";
import { useState } from "react";
import CastCard from "./CastCard";

const CastGrid = ({ cast, cols }: { cast: Cast[]; cols?: number }) => {
  const [limit, setLimit] = useState<number>(12);
  return (
    <>
      <Grid columns={cols ? cols : 6}>
        {cast.slice(0, limit).map((castMember: Cast) => (
          <GridCol span={1} key={castMember.id}>
            <CastCard castMember={castMember} />
          </GridCol>
        ))}
        <GridCol span={4}>
          <Button
            onClick={() => {
              if (limit == cast.length) return setLimit(12);
              else setLimit(cast.length);
            }}
          >
            {limit == 12 ? "View More " : "Hide Cast"}
          </Button>
        </GridCol>
      </Grid>
    </>
  );
};

export default CastGrid;

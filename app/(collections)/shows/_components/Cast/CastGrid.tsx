"use client";
import { Cast } from "@/lib/entities/TMDB";
import { Button, Grid, GridCol, Title, Space } from "@mantine/core";
import React, { useState } from "react";
import CastCard from "./CastCard";

const CastGrid = ({ cast }: { cast: Cast[] }) => {
  const [limit, setLimit] = useState<number>(12);
  return (
    <>
      <Grid columns={6}>
        {cast.slice(0, limit).map((castMember: Cast) => (
          <GridCol span={1}>
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

"use client";
import { Cast } from "@/lib/entities/TMDB";
import { Button, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import CastCard from "./CastCard";

const CastGrid = ({ cast }: { cast: Cast[] | undefined }) => {
  const [limit, setLimit] = useState<number>(12);

  if (!cast) return <p>No Cast Information Available</p>;
  return (
    <>
      <SimpleGrid
        type="container"
        cols={{ base: 1, "300px": 2, "500px": 3, "800px": 4 }}
      >
        {cast.slice(0, limit).map((castMember: Cast) => (
          <CastCard castMember={castMember} />
        ))}
      </SimpleGrid>
      <Button
        onClick={() => {
          if (limit == cast.length) return setLimit(12);
          else setLimit(cast.length);
        }}
      >
        {limit == 12 ? "View More " : "Hide Cast"}
      </Button>
    </>
  );
};

export default CastGrid;

import { GridCol, Stack, Title } from "@mantine/core";
import React from "react";
import SeasonsMenu from "../Seasons/SeasonsMenu";
import { Season } from "@/lib/entities/TMDB";

const SeasonsSection = ({ seasons }: { seasons?: Season[] }) => {
  if (!seasons)
    return (
      <GridCol span={8}>
        <div>No Seasons</div>
      </GridCol>
    );
  return (
    <GridCol span={8}>
      <Stack>
        <Title>Seasons</Title>
        <SeasonsMenu seasons={seasons} />
      </Stack>
    </GridCol>
  );
};

export default SeasonsSection;

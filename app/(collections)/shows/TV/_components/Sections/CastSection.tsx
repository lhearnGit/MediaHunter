"use client";
import { GridCol, Space } from "@mantine/core";
import React from "react";
import CastGrid from "../../../_components/Cast/CastGrid";
import { Cast } from "@/lib/entities/TMDB";

const CastSection = ({ cast }: { cast: Cast[] }) => {
  return (
    <GridCol span={10}>
      <Space h="xl" />
      <CastGrid cast={cast} cols={4} />
    </GridCol>
  );
};

export default CastSection;

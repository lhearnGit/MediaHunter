"use client";
import { Season_Details } from "@/lib/entities/TMDB";
import { Title } from "@mantine/core";
import React from "react";

const SeasonDetails = ({ season }: { season: Season_Details }) => {
  return (
    <>
      <Title>{season.name}</Title>
    </>
  );
};

export default SeasonDetails;

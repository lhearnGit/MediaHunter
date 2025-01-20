import { Season_Details } from "@/lib/entities/TMDB";
import { Box, Stack, Text } from "@mantine/core";
import React from "react";

const SeasonDetails = ({ season }: { season: Season_Details }) => {
  return (
    <>
      <Stack gap={5}>
        <Text size="lg">Aired On {season.air_date}</Text>
        <Text size="lg">Total Episodes : {season.episode_count}</Text>
      </Stack>
      <Box>
        <Text size="lg">Season {season.season_number} Summary </Text>
        <Text size="md" pl={20}>
          {season.overview.length < 2
            ? "No Summary Available "
            : season.overview}
        </Text>
      </Box>
    </>
  );
};

export default SeasonDetails;

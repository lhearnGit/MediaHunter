import { Box, Group, Stack, Title, Text } from "@mantine/core";
import React from "react";

const MovieDetails = ({
  release_date,
  runtime,
  revenue,
  budget,
}: {
  release_date: string | undefined;
  runtime: number;
  revenue: number;
  budget: number;
}) => {
  return (
    <Box>
      <Text size="xl">Details</Text>
      <Stack justify="space-evenly" pl={30} pt={10}>
        <Box>
          <Text size="md">
            Release Date - {release_date ? release_date : "Not Yet Released"}
          </Text>
          <Text size="md">
            Runtime - {Math.round(runtime / 60)}h {runtime % 60}m
          </Text>
          <Text size="md"> Revenue - {revenue} </Text>
          <Text size="md">Budget {budget}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default MovieDetails;

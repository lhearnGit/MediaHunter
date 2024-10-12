import { Group, Title, Box, Text } from "@mantine/core";
import React from "react";

const ShowStatus = () => {
  return (
    <>
      <Title>Status</Title>
      <Group grow justify="space-evenly" mx={10}>
        <Box>
          <Text size="xl">Release Date</Text>
          <Text size="md">Some Value</Text>
        </Box>
        <Box>
          <Text size="xl">Runtime </Text>
          <Text size="md">Some Value</Text>
        </Box>
        <Box>
          <Text size="xl">Revenue </Text>
          <Text size="md">Budget</Text>
        </Box>
      </Group>
    </>
  );
};

export default ShowStatus;

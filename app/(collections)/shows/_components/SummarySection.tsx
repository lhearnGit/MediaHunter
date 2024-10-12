import { Title, Text } from "@mantine/core";
import React from "react";

const SummarySection = ({ summary }: { summary: string }) => {
  return (
    <>
      <Title>SummarySection</Title>
      <Text pl={10}>{summary}</Text>
    </>
  );
};

export default SummarySection;

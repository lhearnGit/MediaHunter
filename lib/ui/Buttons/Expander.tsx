"use client";
import { Box, Button, Collapse, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

export default function Expander({
  children,
  triggerLabel,
}: {
  children: ReactNode;
  triggerLabel: string;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="start" mb={5}>
        <Button onClick={toggle}>{triggerLabel}</Button>
      </Group>
      <Collapse in={opened}>{children}</Collapse>
    </Box>
  );
}

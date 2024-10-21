"use client";
import { Box, Collapse, Group, Space, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

export default function ParamContainer({
  children,
  triggerLabel,
}: {
  children: ReactNode;
  triggerLabel: string;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400}>
      <button className="w-full" onClick={toggle}>
        {triggerLabel}
      </button>
      <Space h="lg" />
      <Collapse in={opened}>{children}</Collapse>
      <Space h="lg" />
    </Box>
  );
}

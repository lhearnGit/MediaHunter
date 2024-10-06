"use client";
import React from "react";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

const SideOptions = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication"></Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
};

export default SideOptions;

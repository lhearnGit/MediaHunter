import "@mantine/core/styles.css";
import { Container } from "@mantine/core";
import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return <Container size="xl">{children} </Container>;
};

export default ProfileLayout;

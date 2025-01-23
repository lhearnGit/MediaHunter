"use client";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return <Container size="xl">{children} </Container>;
};

export default ProfileLayout;

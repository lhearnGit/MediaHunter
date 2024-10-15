"use client";
import "@mantine/core/styles.css";
import { Container } from "@mantine/core";
import React, { ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  if (status == "unauthenticated") return signIn();
  return <Container size="xl">{children} </Container>;
};

export default ProfileLayout;

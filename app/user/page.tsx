"use client";
import { useProfileList } from "@/lib/hooks/profile/useProfileList";
import { Space, Title, Container, Grid } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserDashboard = () => {
  const { data, status } = useSession();
  if (status == "unauthenticated") signIn();
  const { profile, isLoading, error } = useProfileList(data?.user.id!);

  return (
    <>
      <Title>Dashboard</Title>
      <Space h="xl" />
      <Grid grow gutter={"lg"}>
        <Grid.Col span={5} offset={2}>
          <Link href={"/user/account"}>Account</Link>
        </Grid.Col>
        <Grid.Col span={5} offset={2}>
          <Link href={"/user/games"}>Games</Link>
        </Grid.Col>
        <Grid.Col span={5}>
          <Link href={"/user/shows"}>Shows</Link>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserDashboard;

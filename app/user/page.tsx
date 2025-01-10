"use client";
import { Grid, Space, Title } from "@mantine/core";
import Link from "next/link";

const UserDashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Space h="xl" />
      <Grid grow gutter={"lg"}>
        <Grid.Col span={5}>
          <Link href={"/user/shows"}>Shows</Link>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UserDashboard;

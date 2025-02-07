import SignInPage from "@/app/signin/page";
import { auth } from "@/auth";
import { Title, Space, Stack } from "@mantine/core";
import React from "react";

const UserProfileSettingsPage = async () => {
  const session = await auth();
  if (!session)
    return SignInPage({ searchParams: { callbackUrl: "/user/profile" } });

  return (
    <>
      <Title>User Profile Page</Title>
      <Space h="xl" />
      <Stack>
        <Title>Section Title</Title>
      </Stack>
    </>
  );
};

export default UserProfileSettingsPage;

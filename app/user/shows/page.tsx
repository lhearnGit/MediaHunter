"use client";
import { useProfileList } from "@/lib/hooks/profile/useProfileList";
import { Skeleton, Space, Stack, Title } from "@mantine/core";
import ProfileTestComponent from "../_components/ProfileTestComponent";

const UserShowsPage = () => {
  const { profile, isLoading, isFetching } = useProfileList(
    "66d73678a5ae02f237ead4d9"
  );

  if (isLoading) return <Skeleton />;
  if (isFetching) return <Skeleton />;

  console.log("-----------------------------");
  console.log(profile);
  return (
    <>
      <Title>User Shows Page</Title>
      <Space h="xl" />
      <Stack>
        <Title>Section Title</Title>
        <ProfileTestComponent collection={profile} />
      </Stack>
    </>
  );
};

export default UserShowsPage;

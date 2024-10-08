"use client";
import {
  Button,
  Grid,
  Group,
  Skeleton,
  Space,
  Text,
  useMantineTheme,
} from "@mantine/core";
const child = <Skeleton height={140} radius="md" animate={false} />;

export function GameContent({ title }: { title: string }) {
  const theme = useMantineTheme();
  return (
    <>
      <Group bg="black" justify="space-between">
        <Text>{title}</Text>
        <Group>
          <Button>ADD</Button>
          <Button>REMOVE</Button>
        </Group>
      </Group>
      <Space h="md" />
      <Grid grow gutter={"sm"}>
        <Grid.Col bg={"cyan"} span={"content"}>
          Summary Component
        </Grid.Col>
        <Grid.Col span={"content"} bg={"teal"}>
          Trailer Component
        </Grid.Col>
        <Grid.Col bg={"gray"} span={"content"}>
          Details Component
        </Grid.Col>
        <Grid.Col bg={"gray"} offset={1} span={"content"}>
          Details Component
        </Grid.Col>
        <Grid.Col bg={"gray"} offset={1} span={"content"}>
          Details Component
        </Grid.Col>
        <Grid.Col bg={"gray"} offset={1} span={"content"}>
          Details Component
        </Grid.Col>
      </Grid>
    </>
  );
}

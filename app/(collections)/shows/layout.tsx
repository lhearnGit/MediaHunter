import "@mantine/core/styles.css";

import { Box, Group, Space } from "@mantine/core";
import Link from "next/link";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Group justify={"space-evenly"}>
        <Link href={"/shows/movies"}>Movies</Link>
        <Link href={"/shows/tv"}>TV Shows</Link>
      </Group>
      <Space h={"xl"} />
      {children}
    </Box>
  );
}

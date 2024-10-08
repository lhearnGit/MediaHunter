import "@mantine/core/styles.css";

import { Flex } from "@mantine/core";
import Link from "next/link";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Flex justify={"space-evenly"}>
        <Link href={"/shows/movies"}>Movies</Link>
        <Link href={"/shows/tv"}>TV Shows</Link>
      </Flex>
      {children}
    </div>
  );
}

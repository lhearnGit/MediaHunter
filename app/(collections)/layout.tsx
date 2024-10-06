import "@mantine/core/styles.css";

import { Container } from "@mantine/core";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container size={"xl"}>{children}</Container>;
}

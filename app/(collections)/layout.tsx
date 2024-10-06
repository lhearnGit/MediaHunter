import "@mantine/core/styles.css";

import { Flex } from "@mantine/core";
import { HeaderTabs } from "@/lib/ui/headers/HeaderTabs";
import Drawer from "@/lib/ui/Drawer";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  DEFAULT_THEME,
} from "@mantine/core";
import { HeaderTabs } from "@/lib/ui/headers/HeaderTabs";
import NavBar from "@/lib/ui/navbar/NavBar";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={DEFAULT_THEME}>
          <NavBar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import NavBar from "@/lib/ui/navbar/NavBar";
import { theme } from "@/lib/theme";
import { Footer } from "@/lib/ui/Sections/Footer/Footer";
import AuthProvider from "../providers/Provider";
import Providers from "@/providers/QueryClientProvider";
import classes from "./layout.module.css";
export const metadata = {
  title: "Media Hunter",
  description:
    "NextJS webapp to hunt for and track multiple types of media across medium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <Providers>
          <AuthProvider>
            <MantineProvider forceColorScheme="dark" theme={theme}>
              <NavBar />
              <div className={classes.container}>{children}</div>
              <Footer />
            </MantineProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

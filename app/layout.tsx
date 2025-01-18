// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider, Container } from "@mantine/core";
import NavBar from "@/lib/ui/navbar/NavBar";
import { theme } from "@/lib/theme";
import { Footer } from "@/lib/ui/Sections/Footer/Footer";
import AuthProvider from "../providers/Provider";
import Providers from "@/providers/QueryClientProvider";
import classes from "./layout.module.css";
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
        <Providers>
          <AuthProvider>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
              <div className={classes.container}>
                <NavBar />
                {children}
                <Footer />
              </div>
            </MantineProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

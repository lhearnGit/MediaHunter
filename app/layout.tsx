// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider, Container } from "@mantine/core";
import NavBar from "@/lib/ui/navbar/NavBar";
import { theme } from "@/lib/theme";
import { Footer } from "@/lib/ui/Sections/Footer/Footer";
import AuthProvider from "./auth/Provider";
import TanStackProvider from "@/providers/QueryClientProvider";

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
        <TanStackProvider>
          <AuthProvider>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
              <NavBar />
              <Container size={"responsive"}>{children}</Container>
              <Footer />
            </MantineProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

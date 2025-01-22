"use client";
import { SignIn } from "@/lib/auth/SignIn";
import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  rem,
  Space,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconDeviceGamepad2,
  IconDeviceTv,
  IconLogout,
  IconMovie,
  IconSettings,
} from "@tabler/icons-react";
import cx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./NavBar.module.css";
import { gameSubLinks, mainPages, movieSubLinks, PagePath } from "./SiteLinks";

const NavBar = () => {
  const { data, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useMantineTheme();
  const [subNavLinks, setSubNavLinks] = useState<PagePath[]>();

  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  useEffect(() => {
    //prevents subpages from re-rendering on every state change

    switch (pathname) {
      case "/games": {
        gameSubLinks.forEach(({ href }: PagePath) => {
          if (href == pathname) console.log("equal");
        });
        return setSubNavLinks(gameSubLinks);
      }
      case "/games/search": {
        return setSubNavLinks(gameSubLinks);
      }
      case "/movies": {
        return setSubNavLinks(movieSubLinks);
      }
      default: {
        return setSubNavLinks(undefined);
      }
    }
  }, [pathname]);

  return (
    <div className={classes.header}>
      <Space h={"md"} />
      <Container className={classes.mainSection} size="xl">
        <Group gap={2} visibleFrom="xs" justify="space-between">
          {mainPages.map(({ href, label }: PagePath) => (
            <Link className={classes.link} key={label} href={href}>
              {label}
            </Link>
          ))}
          <div />
          <Group justify="right" my={"md"} mx={"lg"}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />
            {status == "authenticated" ? (
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group gap={7}>
                      <Avatar
                        src={data?.user.image}
                        alt={data?.user.name}
                        radius="xl"
                        size={"sm"}
                      />
                      <Text fw={500} size="lg" lh={1} mr={3}>
                        {data?.user.name}
                      </Text>
                      <IconChevronDown
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    className={classes.link}
                    leftSection={
                      <IconDeviceGamepad2
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                    onClick={() => {
                      router.replace("/user/games");
                    }}
                  >
                    My Games
                  </Menu.Item>
                  <Menu.Item
                    className={classes.link}
                    leftSection={
                      <IconDeviceTv
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    }
                    onClick={() => {
                      router.replace("/user/shows");
                    }}
                  >
                    My TV Shows
                  </Menu.Item>
                  <Menu.Item
                    className={classes.link}
                    leftSection={
                      <IconMovie
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.green[6]}
                        stroke={1.5}
                      />
                    }
                    onClick={() => {
                      router.replace("/user/movies");
                    }}
                  >
                    My Movies
                  </Menu.Item>

                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    className={classes.link}
                    leftSection={
                      <IconSettings
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => router.replace("/user/profile")}
                  >
                    Profile Settings
                  </Menu.Item>

                  <Menu.Item
                    className={classes.link}
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                        color={theme.colors.red[6]}
                      />
                    }
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Menu.Item>

                  <Menu.Divider />
                </Menu.Dropdown>
              </Menu>
            ) : (
              <SignIn returnPath={pathname} />
            )}
          </Group>
        </Group>
      </Container>
      {subNavLinks ? (
        <Container className={classes.mainSection} size="xl">
          <Space h={"md"} />
          <Group grow>
            {subNavLinks.map(({ href, label }: PagePath) => (
              <Link className={classes.link} key={label} href={href}>
                {label}
              </Link>
            ))}
          </Group>
        </Container>
      ) : (
        <div />
      )}
    </div>
  );
};

export default NavBar;

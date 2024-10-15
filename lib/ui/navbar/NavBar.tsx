"use client";
import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  useMantineTheme,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./NavBar.module.css";
import SearchWithButton from "../Search/SearchWithButton";
import { useSession } from "next-auth/react";
import { SignOut } from "@/lib/auth/SignOut";
import Link from "../Link/Link";
import { SignIn } from "@/lib/auth/SignIn";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/books", label: "Books" },
  { href: "/shows", label: "Shows" },
  { href: "/user", label: "dashboard" },
];
const NavBar = () => {
  const { data, status } = useSession();
  const pathname = usePathname();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Space h={"md"} />
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <MantineLogo size={28} />

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

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
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
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
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  <Link href={"/user/games"} label="Games" />
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  <Link href={"/user/shows"} label="Shows" />
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  <Link href={"/user/books"} label="Books" />
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  <Link href={"/user/profile"} label="Profile Settings" />
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  <SignOut />
                </Menu.Item>

                <Menu.Divider />
              </Menu.Dropdown>
            </Menu>
          ) : (
            <SignIn returnPath={pathname} />
          )}
        </Group>
      </Container>
      <Container size="lg">
        <Group gap={2} visibleFrom="xs" justify="space-between">
          <Group>
            {links.map((link) => (
              <Link key={link.label} href={link.href} label={link.label} />
            ))}
          </Group>
          <SearchWithButton />
        </Group>
      </Container>
      <Space h="md" />
    </div>
  );
};

export default NavBar;

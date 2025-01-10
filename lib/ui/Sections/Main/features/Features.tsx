"use client";
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconGauge, IconUser, IconLock } from "@tabler/icons-react";
import classes from "./features.module.css";

export const FeatureData = [
  {
    icon: IconGauge,
    title: "Games",
    description: "Games",
  },
  {
    icon: IconGauge,
    title: "Books",
    description: "Books Description",
  },
  {
    icon: IconGauge,
    title: "Shows",
    description: "Shows Description",
  },
  {
    icon: IconUser,
    title: "Profiles",
    description:
      "Create and maintain your own personal lists of games, movies, books and tv shows",
  },

  {
    icon: IconLock,
    title: "Authentication & Authorization",
    description:
      "Using OAuth via AuthJs quickly make and maintain your account using your gmail account",
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function Features() {
  const features = FeatureData.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Discover Media</Title>

      <Container size={560} p={0}></Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        verticalSpacing={{ base: "xl", md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

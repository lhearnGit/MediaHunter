"use client";
import { Container, Title, Text, Button } from "@mantine/core";
import classes from "./HeroImageRight.module.css";
import Link from "next/link";

export function HeroImageRight({
  description,
  collectionType,
  href,
  title,
}: {
  description: string;
  href: string;
  title: string;
  collectionType: string;
}) {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>{title}</Title>

            <Text className={classes.description} mt={30}>
              {description}
            </Text>

            <Button
              component={Link}
              href={href}
              variant="gradient"
              gradient={{
                from: "var(--mantine-color-black)",
                to: "var(--mantine-color-cyan-7)",
              }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Discover New {collectionType}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

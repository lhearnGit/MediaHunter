"use client";
import { Param } from "@/app/games/_component/SearchForm/Multi/MultiSearchable";
import { ArrayToCSV } from "@/utils/helpers/stringFns";
import {
  Box,
  Button,
  Container,
  Drawer,
  Group,
  SimpleGrid,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import classes from "./TMDBSearchContainer.module.css";

interface Props {
  path: "movies" | "tv";
  params: Param[];
}
const TMDBSearchContainer = ({ path, params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [withValues, setWithValues] = useState<Param[]>([]);

  const [opened, { open, close }] = useDisclosure(false);

  const genres = params.filter((param) => param.key == "genres");
  const countries = params.filter((param) => param.key == "countries");

  const handleIncludeValue = (val: Param) => {
    setWithValues((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };

  const handleSubmit = () => {
    const searchQuery = new URLSearchParams();

    const with_genres: string[] = [];
    withValues.forEach((value) => {
      console.log(value.id.toString());
      with_genres.push(value.id.toString());
    });
    if (with_genres.length == 0) return router.push(pathname);

    searchQuery.set("with_genres", ArrayToCSV(with_genres));
    console.log(`${pathname}?${searchQuery.toString()}`);

    return router.push(`${pathname}?${searchQuery.toString()}`);
  };

  const DrawerContent = () => {
    return (
      <Box>
        <Title className={classes.title}>Genres</Title>
        <SimpleGrid cols={3} maw={400} spacing={5} className={classes.grid}>
          {genres.map((item) => (
            <UnstyledButton
              className={classes.button}
              size="compact-md"
              onClick={() => handleIncludeValue(item)}
              key={item.id}
              bg={withValues.includes(item) ? "gray" : ""}
            >
              {item.name}
            </UnstyledButton>
          ))}
        </SimpleGrid>
        <Box>
          <Title>Countries</Title>
          <SimpleGrid cols={3} maw={400} className={classes.grid} spacing={5}>
            {countries.map((item) => (
              <UnstyledButton
                className={classes.button}
                size="compact-md"
                onClick={() => handleIncludeValue(item)}
                key={item.id}
                bg={withValues.includes(item) ? "gray" : ""}
              >
                {item.name}
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Box>
        <br />
        <Group justify="end">
          <Button
            my={10}
            onClick={() => {
              close();
              handleSubmit();
            }}
          >
            Submit
          </Button>
          <Button
            bg={"red"}
            my={10}
            onClick={() => {
              setWithValues([]);
              router.replace(`${pathname}`);
            }}
          >
            Reset
          </Button>
        </Group>
      </Box>
    );
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title={`Filter ${path}`}>
        <DrawerContent />
      </Drawer>
      <Container size="xl" className={classes.containerPadding}>
        <UnstyledButton fz={48} className={classes.drawerButton} onClick={open}>
          Search for {path == "tv" ? path.toLocaleUpperCase() + " Shows" : path}
        </UnstyledButton>
      </Container>
    </>
  );
};

export default TMDBSearchContainer;

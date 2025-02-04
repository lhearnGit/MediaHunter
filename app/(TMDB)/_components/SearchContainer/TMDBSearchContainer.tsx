"use client";
import { Param } from "@/app/games/_component/SearchForm/Multi/MultiSearchable";
import { ArrayToCSV } from "@/utils/helpers/stringFns";
import { Button, Container, Group, SimpleGrid } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  path: "movies" | "tv";
  params: Param[];
}
const TMDBSearchContainer = ({ path, params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(`${pathname}?${searchParams.toString()}`);

  const [withValues, setWithValues] = useState<Param[]>([]);

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

  const ParamBtns = (items: Param[]) => {
    return (
      <SimpleGrid cols={3} maw={500}>
        {items &&
          items.map((item: Param) => (
            <Button
              onClick={() => handleIncludeValue(item)}
              key={item.id}
              bg={withValues.includes(item) ? "green" : ""}
            >
              {item.name}
            </Button>
          ))}
      </SimpleGrid>
    );
  };

  const genreBtns = ParamBtns(params.filter((param) => param.key == "genres"));
  const countryBtns = ParamBtns(
    params.filter((param) => param.key == "countries")
  );

  return (
    <Container size="xl">
      <h2>Search for {path}</h2>
      <Group>
        <div>
          <h2>Genres</h2>
          {genreBtns}
        </div>
        <div>
          <h2>Countries</h2>
          {countryBtns}
        </div>
      </Group>
      <Group>
        <Button my={10} onClick={handleSubmit}>
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
    </Container>
  );
};

export default TMDBSearchContainer;

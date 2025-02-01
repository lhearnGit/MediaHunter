"use client";
import { ArrayToCSV } from "@/utils/helpers/stringFns";
import {
  Button,
  Collapse,
  Container,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MultiSearchable, Param } from "./MultiSearchable";
import { ParamPill } from "./ParamPill";

interface Props {
  GenresAndThemes: Param[];
  Platforms: Param[];
}
const MultiSearchableContainer = ({ GenresAndThemes, Platforms }: Props) => {
  const currentSearchParams = useSearchParams();
  const [opened, { toggle }] = useDisclosure(true);
  const router = useRouter();
  const [values, setValues] = useState<Param[]>([]);
  const handleValueSelect = (val: Param) =>
    setValues((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: Param) =>
    setValues((current) => current.filter((v) => v !== val));

  const SubmitSearch = () => {
    let themes: string[] = [];
    let genres: string[] = [];
    let platform: string[] = [];
    const searchParams = new URLSearchParams();

    values.forEach(({ key, id }: Param) => {
      switch (key) {
        case "themes": {
          themes.push(`${id}`);
          break;
        }
        case "genres": {
          genres.push(`${id}`);
          break;
        }
        case "platform": {
          platform.push(`${id}`);
          break;
        }
      }
    });

    if (themes.length > 0) {
      searchParams.append("themes", ArrayToCSV(themes));
    } else searchParams.delete("themes");
    if (genres.length > 0) {
      searchParams.append("genres", ArrayToCSV(genres));
    } else searchParams.delete("genres");
    if (platform.length > 0) {
      searchParams.append("platform", ArrayToCSV(platform));
    } else searchParams.delete("platforms");
    searchParams.append("page", "1");

    router.replace(`/games/search?${searchParams.toString()}`);
  };
  return (
    <Container size="xl" my={20}>
      {opened ? (
        <>
          <Space h="xl" />
        </>
      ) : (
        <Stack>
          <Title onClick={toggle} display={`${!opened}`}>
            Searching for ...
          </Title>
          <Group gap={3}>
            {values &&
              values.map((item: Param) => (
                <ParamPill
                  key={item.id + item.key}
                  value={item}
                  label={item.name}
                  onRemove={() => handleValueRemove(item)}
                />
              ))}
          </Group>
        </Stack>
      )}
      <Collapse in={opened}>
        <Stack gap={0}>
          <Group gap={3}>
            {values &&
              values.map((item: Param) => (
                <ParamPill
                  key={item.id + item.key}
                  value={item}
                  label={item.name}
                  onRemove={() => handleValueRemove(item)}
                />
              ))}
          </Group>

          <Group>
            <div>
              <h2>Genres</h2>
              <MultiSearchable
                items={GenresAndThemes}
                placelabel={"Select Genres"}
                removeValue={handleValueRemove}
                selectValue={handleValueSelect}
              />
            </div>
            <div>
              <h2>Platforms</h2>
              <MultiSearchable
                items={Platforms}
                placelabel={"Select Platforms"}
                removeValue={handleValueRemove}
                selectValue={handleValueSelect}
              />
            </div>
          </Group>
        </Stack>
      </Collapse>
      {values.length > 0 && (
        <Group>
          <Button
            mt={10}
            onClick={() => {
              toggle();
              SubmitSearch();
            }}
          >
            Search
          </Button>
          <Button
            color="red"
            mt={10}
            onClick={() => {
              setValues([]);
            }}
          >
            Reset
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default MultiSearchableContainer;

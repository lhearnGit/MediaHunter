"use client";
import {
  Button,
  Checkbox,
  Collapse,
  Group,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./GameSearchForm.module.css";
import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import { ArrayToCSV } from "@/utils/helpers/stringFns";
import { useDisclosure } from "@mantine/hooks";

type Inputs = {
  genres: string[];
  themes: string[];
};

interface FormData {
  genres: IGDB_Genre[];
  themes: Theme[];
}
const GameSearchForm = ({ genres, themes }: FormData) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ genres, themes }) => {
    const params = new URLSearchParams();
    if (Array.isArray(genres)) {
      params.append("genres", ArrayToCSV(genres));
    } else {
      params.append("genres", genres);
    }
    if (Array.isArray(themes)) {
      params.append("themes", ArrayToCSV(themes));
    } else {
      params.append("themes", themes);
    }
    toggle();
    router.replace(`${pathname}/?${params.toString()}`);
  };

  return (
    <Stack>
      <Group>
        <h1 className={classes.title}>Search for Games</h1>
        <button className="w-full" onClick={toggle}>
          filter
        </button>
      </Group>
      <div className={classes.wrapper}>
        <Collapse in={opened}>
          <form
            id="gamesearchform"
            className={classes.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <SimpleGrid className={classes.grid} cols={{ base: 1, xl: 2 }}>
              <Stack className={classes.stack}>
                <h1>Genres</h1>
                <SimpleGrid
                  className={classes.subGrid}
                  cols={{ base: 3, lg: 4, xl: 5 }}
                >
                  {genres.map(({ name, id }: IGDB_Genre) => (
                    <Checkbox
                      key={id}
                      {...register("genres")}
                      defaultChecked={searchParams.has("genres", id.toString())}
                      value={id}
                      label={name}
                    />
                  ))}
                </SimpleGrid>
              </Stack>
              <Stack className={classes.stack}>
                <h1>Themes</h1>
                <SimpleGrid
                  className={classes.subGrid}
                  cols={{ base: 3, lg: 4, xl: 5 }}
                >
                  {themes.map(({ name, id }: Theme) => (
                    <Checkbox
                      key={id}
                      {...register("themes")}
                      defaultChecked={searchParams.has("themes", id.toString())}
                      value={id}
                      label={name}
                    />
                  ))}
                </SimpleGrid>
              </Stack>
            </SimpleGrid>
            <Button type="submit" className={classes.submit}>
              Search
            </Button>
            <Button
              type="reset"
              onClick={() => {
                router.replace(`${pathname}`);
              }}
              className={classes.submit}
            >
              Clear
            </Button>
          </form>
        </Collapse>
      </div>
    </Stack>
  );
};

export default GameSearchForm;

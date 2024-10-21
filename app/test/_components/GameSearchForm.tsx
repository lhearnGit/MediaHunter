"use client";

import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import { Checkbox, Grid, SimpleGrid, Space, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

interface FormData {
  genres: string[];
  themes: string[];
}
const GameSearchForm = ({
  genres,
  themes,
}: {
  themes: Theme[];
  genres: IGDB_Genre[];
}) => {
  const { register, control, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const searchParams = new URLSearchParams();
    const { genres, themes } = data;
    if (genres) searchParams.append("genres", `${[...genres]}`);
    if (themes) searchParams.append("themes", `${[...themes]}`);
    router.push(`/games?${searchParams.toString()}`);
  };

  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
  const handleGenreChange = (option: string) => {
    setCheckedGenres((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else if (prev.length < 2) {
        return [...prev, option];
      }
      return prev;
    });
  };
  const [checkedThemes, setCheckedThemes] = useState<string[]>([]);
  const handleThemeChange = (option: string) => {
    setCheckedThemes((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else if (prev.length < 2) {
        return [...prev, option];
      }
      return prev;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Col span={6}>
          <Stack>
            <Title size="xl">Genres</Title>
            <Space h="md" />
            <SimpleGrid cols={3}>
              {genres.map((genre: IGDB_Genre) => (
                <Controller
                  key={genre.id}
                  name="genres"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      {...register("genres")}
                      key={genre.id}
                      label={genre.name}
                      value={genre.id.toString()}
                      checked={checkedGenres.includes(genre.id.toString())}
                      onChange={() => {
                        onChange();
                        handleGenreChange(genre.id.toString());
                      }}
                    />
                  )}
                />
              ))}
            </SimpleGrid>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack>
            <Title size="xl">Themes</Title>
            <Space h="md" />
            <SimpleGrid cols={4}>
              {themes.map((theme: Theme) => (
                <Controller
                  key={theme.id}
                  name="themes"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      {...register("themes")}
                      key={theme.id}
                      label={theme.name}
                      value={theme.id.toString()}
                      checked={checkedThemes.includes(theme.id.toString())}
                      onChange={() => {
                        onChange();
                        handleThemeChange(theme.id.toString());
                      }}
                    />
                  )}
                />
              ))}
            </SimpleGrid>
          </Stack>
        </Grid.Col>
      </Grid>

      <Space h="xl" />

      <input type="submit" />
    </form>
  );
};

export default GameSearchForm;

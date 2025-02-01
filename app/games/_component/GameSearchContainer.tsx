import { fetchGenres } from "@/utils/fetches/IGDB/fetchGenres";
import { fetchPlatforms } from "@/utils/fetches/IGDB/fetchPlatforms";
import { fetchThemes } from "@/utils/fetches/IGDB/fetchThemes";
import { sortBy } from "lodash";
import { Suspense } from "react";
import { Param } from "./SearchForm/Multi/MultiSearchable";
import MultiSearchableContainer from "./SearchForm/Multi/MultiSearchableContainer";
import { Title } from "@mantine/core";

const GameSearchContainer = async () => {
  //results are cached, they refetch every 7 days, convert to webhook later
  const genres = await fetchGenres();
  const themes = await fetchThemes();
  const platforms = await fetchPlatforms();

  let GenresAndThemes: Param[] = [];
  let Platforms: Param[] = [];

  genres.forEach(({ name, id }) => {
    GenresAndThemes.push({ key: "genres", id, name });
  });
  themes.forEach(({ name, id }) => {
    GenresAndThemes.push({ key: "themes", id, name });
  });
  platforms.forEach(({ name, id }) => {
    Platforms.push({ key: "platform", id, name });
  });

  return (
    <Suspense fallback={<Title>Search for Games</Title>}>
      <MultiSearchableContainer
        GenresAndThemes={sortBy(GenresAndThemes, ["name"])}
        Platforms={sortBy(Platforms, ["name"])}
      />
    </Suspense>
  );
};

export default GameSearchContainer;

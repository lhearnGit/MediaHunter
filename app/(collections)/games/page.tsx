import { Game } from "@/lib/entities/IGDB";
import PageHandler from "@/lib/ui/Buttons/PageHandler";
import ItemCard from "@/lib/ui/Card/ItemCard";
import SearchForm from "@/lib/ui/forms/SearchForm/SearchForm";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";
import Resize_Image from "@/utils/helpers/Resize_IGDB";
import { SimpleGrid } from "@mantine/core";
import React from "react";

const numPages = 20;
const currPage = 9;

const genres = [
  { label: "G1", value: "G1" },
  { label: "G2", value: "G2" },
  { label: "G3", value: "G3" },
  { label: "G4", value: "G4" },
  { label: "T1", value: "T1" },
  { label: "T2", value: "T2" },
  { label: "T3", value: "T3" },
  { label: "T4", value: "T4" },
];

interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}

async function fetchGames() {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `
    fields name,cover.url; 
    sort rating_count desc;
    limit:20;
    `,
  };
  const response: Game_Cover[] = await IGDB_Fetch({
    ...request,
  });
  return response;
}

const GamesHome = async () => {
  const games = await fetchGames();

  console.log(games);
  return (
    <div>
      <SearchForm formHeader="Games" items={genres} />
      <SimpleGrid cols={5}>
        {games.map(({ id, name, cover }) => (
          <ItemCard
            key={id}
            id={id}
            title={name}
            image={Resize_Image(cover.url, "cover_big")}
          />
        ))}
      </SimpleGrid>
      <PageHandler numPages={numPages} currPage={currPage} />
    </div>
  );
};

export default GamesHome;

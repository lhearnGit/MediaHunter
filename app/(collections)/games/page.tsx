import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";
import ItemCard from "@/lib/ui/Card/CardLink";
import { SimpleGrid } from "@mantine/core";
import Resize_Image from "@/utils/helpers/Resize_IGDB";
import PageHandler from "@/lib/ui/PageHandler";

const offset = 20;
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

const theme = "";
const genre = "";

interface Game_Cover {
  id: number;
  name: string;
  cover: { url: string };
}

async function fetchGames(page_number: number) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `
    fields name,cover.url; 
    limit 20;
    offset ${offset * page_number};
    sort rating_count desc;
    `,
  };
  const response: Game_Cover[] = await IGDB_Fetch({
    ...request,
  });
  console.log(response);
  return response;
}

const GamesHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else query.append(key, value);
    }
  }

  const page_number = query.get("page");
  const games = await fetchGames(
    page_number == null ? 0 : parseInt(page_number)
  );

  return (
    <div>
      <SimpleGrid cols={5}>
        {games.map(({ id, name, cover }) => (
          <ItemCard
            key={id}
            id={id}
            title={name}
            image={cover.url && Resize_Image(cover.url, "cover_big")}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GamesHome;

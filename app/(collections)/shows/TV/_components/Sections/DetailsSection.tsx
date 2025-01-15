"use client";
import { TMDB_Genre, TvNetwork } from "@/lib/entities/TMDB";
import useUpdateCollection from "@/lib/hooks/profile/useUpdateCollection";
import StyledBadges from "@/lib/ui/StyledBadges";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { Box, GridCol, Group, Image, Space, Text } from "@mantine/core";

export default function DetailsSection({
  name,
  id,
  genres,
  poster,
  number_of_seasons,
  status,
  first_air_date,
  last_air_date,
  networks,
  number_of_episodes,
}: {
  id: number;
  name: string;
  networks: TvNetwork[];
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  genres: TMDB_Genre[];
  poster: string;
  number_of_seasons: number;
  status: string;
}) {
  const updateCollection = useUpdateCollection(
    "66d73678a5ae02f237ead4d9",
    "shows"
  );

  return (
    <GridCol span={4}>
      {poster && (
        <Image src={TMDB_Image_Helper(poster, "original")} alt="no poster" />
      )}
      <Space h="xl" />
      <Space h="xl" />
      <button
        onClick={() => {
          updateCollection.mutate({
            addTo: false,
            data: {
              id: Number(id),
              url: TMDB_Image_Helper(poster, "original"),
              name: name,
            },
          });
        }}
      >
        Add To Collection
      </button>
      ;
      <Group>
        {networks.map((network: TvNetwork) => (
          <Image
            key={network.id}
            alt="no image"
            src={TMDB_Image_Helper(network.logo_path, "w92")}
          />
        ))}
        <Text>First Aired {first_air_date}</Text>
        <Text>Last Aired {first_air_date}</Text>
      </Group>
      <StyledBadges
        label={status}
        color={status.toLowerCase() == "ended" ? "green" : "red"}
      />
      <Box>
        <Text size="lg">Genres</Text>
        {genres.map((genre: TMDB_Genre) => (
          <StyledBadges key={genre.id} label={genre.name} color="blue" />
        ))}
        <Text>Seasons : {number_of_seasons}</Text>
        <Text>Total Episodes : {number_of_episodes}</Text>
      </Box>
    </GridCol>
  );
}

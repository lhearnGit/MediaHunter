import { TMDB_Genre, TvNetwork } from "@/lib/entities/TMDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { GridCol, Space, Box, Image, Text, Group } from "@mantine/core";
import ProfileActions from "../../../../_components/ProfileActions";

export default async function DetailsSection({
  genres,
  poster,
  number_of_seasons,
  status,
  first_air_date,
  last_air_date,
  networks,
  number_of_episodes,
}: {
  networks: TvNetwork[];
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  genres: TMDB_Genre[];
  poster: string;
  number_of_seasons: number;
  status: string;
}) {
  return (
    <GridCol span={4}>
      {poster && <Image src={TMDB_Image_Helper(poster, "original")} />}
      <Space h="xl" />
      <ProfileActions />
      <Space h="xl" />
      <Group>
        {networks.map((network: TvNetwork) => (
          <Image
            key={network.id}
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

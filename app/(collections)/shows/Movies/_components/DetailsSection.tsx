"use client";
import { TMDB_Genre } from "@/lib/entities/TMDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { GridCol, Stack, Box, Group, Image, Text } from "@mantine/core";
import MovieDetails from "../../_components/MovieDetails";
import ProfileActions from "../../../_components/ProfileActions";
import { Profile_Object_Payload } from "@/lib/entities/DBStorage/Collection_Payload";

export default function DetailsSection({
  budget,
  release_date,
  revenue,
  genres,
  poster_path,
  runtime,
  id,
  title,
}: {
  id: number;
  genres: TMDB_Genre[];
  poster_path: string;
  budget: number;
  release_date: string | undefined;
  revenue: number;
  runtime: number;
  title: string;
}) {
  const userId = "66d73678a5ae02f237ead4d9";
  const endpoint = "movies";
  const image = TMDB_Image_Helper(poster_path, "w780");

  const payload: Profile_Object_Payload = {
    itemId: id,
    imageUrl: image,
    name: title,
  };

  return (
    <GridCol span={4}>
      <Stack bg={"dark"} px={5} py={10}>
        <Image radius="sm" src={image} alt="no img" />
        <ProfileActions endpoint={endpoint} userId={userId} payload={payload} />
        <Box>
          <Text size="lg">Genres</Text>
          <Group>
            {genres.map((genre: TMDB_Genre) => (
              <StyledBadges key={genre.id} label={genre.name} color="blue" />
            ))}
          </Group>
        </Box>
        <MovieDetails
          budget={budget}
          release_date={release_date}
          revenue={revenue}
          runtime={runtime}
        />
      </Stack>
    </GridCol>
  );
}

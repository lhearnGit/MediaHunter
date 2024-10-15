import { Profile_Object_Payload } from "@/lib/entities/DBStorage/Collection_Payload";
import { IGDB_Genre } from "@/lib/entities/IGDB";
import StyledBadges from "@/lib/ui/StyledBadges";
import {
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ProfileActions from "../../_components/ProfileActions";
import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";
import { Igdb_Theme } from "@prisma/client";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { BannerImage } from "@/lib/ui/Sections/Headers/BannerImage";

async function fetchGameDetails(id: number) {
  const request: IGDB_Request = {
    endpoint: "games",
    query: `fields 
      id,name,summary,
      rating,rating_count,
      first_release_date,
      cover.url,
      genres.slug,genres.name,
      themes.slug,themes.name,
      videos.video_id,videos.name,
      screenshots.url, screenshots.id,
      age_ratings,
      platforms.id, platforms.name, platforms.slug, platforms.platform_family.id;
      
      
      where id=${id};`,
  };
  const details = await IGDB_Fetch(request);

  return details.pop();
}
const GamesDetailsPage = async ({ params }: { params: { id: number } }) => {
  const userId = "66d73678a5ae02f237ead4d9";
  const endpoint = "movies";
  const { genres, themes, summary, cover, name } = await fetchGameDetails(
    params.id
  );
  const image = IGDB_Image_Helper(cover.url, "1080p");

  const payload: Profile_Object_Payload = {
    itemId: params.id,
    imageUrl: image,
    name: name,
  };

  console.log(genres);
  return (
    <Container size={"xl"}>
      <Title>{name}</Title>

      <Space h="xl" />
      <Grid>
        <GridCol span={8}>
          <Box>
            <Text size="lg">Genres</Text>
            <Group>
              {genres.map((genre: IGDB_Genre) => (
                <StyledBadges key={genre.id} label={genre.name} color="blue" />
              ))}
              {themes.map((genre: Igdb_Theme) => (
                <StyledBadges key={genre.id} label={genre.name} color="blue" />
              ))}
            </Group>
          </Box>
        </GridCol>
        <GridCol span={4}>
          <Stack bg={"dark"} px={5} py={10}>
            <Image radius="sm" src={image} alt="no img" />
            <ProfileActions
              endpoint={endpoint}
              userId={userId}
              payload={payload}
            />
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
};

export default GamesDetailsPage;

/*

*/

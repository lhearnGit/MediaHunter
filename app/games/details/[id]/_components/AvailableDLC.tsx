import { DLC } from "@/lib/entities/IGDB";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import StyledBadges from "@/lib/ui/StyledBadges";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";
import { SimpleGrid, Stack, Text } from "@mantine/core";

const AvailableDLC = ({ DLCSContents }: { DLCSContents: DLC[] }) => {
  return (
    <Stack>
      <Text size="lg">DLC</Text>
      <SimpleGrid cols={4}>
        {DLCSContents.map(({ id, name, total_rating, cover }: DLC) => (
          <Stack key={id}>
            <p>{name}</p>
            <ImageLink
              key={id}
              height={196}
              width={144}
              poster={{
                id: id,
                name: name,
                imageUrl: cover?.url
                  ? IGDB_Image_Helper(cover?.url, "720p")
                  : "/images/notfound.jpg",
              }}
              pathname="games/details"
            />
            {total_rating ? (
              <StyledBadges
                label={`Rating ${Math.round(total_rating)}`}
                color=""
              />
            ) : (
              <StyledBadges label={`No Rating Available`} color="" />
            )}
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default AvailableDLC;

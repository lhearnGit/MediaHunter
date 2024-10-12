"use client";
import { Cast } from "@/lib/entities/TMDB";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { Box, Card, Image, Text } from "@mantine/core";

const CastCard = ({ castMember }: { castMember: Cast }) => {
  const { name, character, profile_path } = castMember;

  return (
    <>
      <Card shadow="sm" padding="xs" radius="md" withBorder>
        <Card.Section>
          <Image
            radius="md"
            src={TMDB_Image_Helper(profile_path, "original")}
            alt={"No Picture available"}
          />
        </Card.Section>
        <Box>
          <Text size="md">{name}</Text>
          <Text size="md" lineClamp={2}>
            {character}
          </Text>
        </Box>
      </Card>
    </>
  );
};

export default CastCard;

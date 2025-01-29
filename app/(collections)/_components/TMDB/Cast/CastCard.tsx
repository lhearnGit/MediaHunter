"use client";
import { Cast } from "@/lib/entities/TMDB";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { Paper, Text } from "@mantine/core";
import Image from "next/image";

const CastCard = ({ castMember }: { castMember: Cast }) => {
  const { name, profile_path } = castMember;

  const h = 240;
  return (
    <Paper radius={"sm"}>
      <Text size="md">{name}</Text>
      <Image
        height={h}
        width={h * (2 / 3)}
        src={
          profile_path
            ? TMDB_Image_Helper(profile_path, "original")
            : "/images/notfound.jpg"
        }
        alt={"No Picture available"}
      />
    </Paper>
  );
};

export default CastCard;

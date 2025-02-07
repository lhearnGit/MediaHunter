"use client";
import AddToUserList from "@/app/games/details/[id]/_components/AddToUserList";
import { Production_Company, TMDB_Genre } from "@/lib/entities/TMDB";
import useUpdateCollection from "@/lib/hooks/profile/useUpdateUserCollection";
import StyledBadges from "@/lib/ui/StyledBadges";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import {
  Box,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  id: number;
  genres: TMDB_Genre[];
  poster_path?: string;
  title: string;
  companies?: Production_Company[];
  children: ReactNode;
  updatePath: "movies" | "shows";
  userId: string | undefined;
}

export default function TMDBDetails({
  genres,
  poster_path,
  id,
  title,
  companies,
  children,
  updatePath,
  userId,
}: Props) {
  return (
    <Stack bg={"dark"} px={5} py={10}>
      {poster_path && <Image radius="sm" src={poster_path} alt="no img" />}
      <AddToUserList
        endpoint={updatePath}
        id={id}
        imageUrl={poster_path}
        name={title}
        userId={userId}
      />
      <Box>
        <Text size="lg">Genres</Text>
        <Group>
          {genres.map((genre: TMDB_Genre) => (
            <StyledBadges key={genre.id} label={genre.name} color="blue" />
          ))}
        </Group>
      </Box>
      {children}

      {companies && (
        <>
          <Title>Produced By</Title>
          <SimpleGrid cols={2}>
            {companies.map((company: Production_Company) => (
              <Group key={company.id}>
                {company.logo_path && (
                  <Image
                    src={TMDB_Image_Helper(company.logo_path, "w92")}
                    alt="failed to load"
                    bg={"white"}
                    p={5}
                    radius={"sm"}
                  />
                )}
                <Text size="md">{company.name}</Text>
              </Group>
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
}

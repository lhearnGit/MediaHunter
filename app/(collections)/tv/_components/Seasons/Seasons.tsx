"use client";
import { Episode, Season } from "@/lib/entities/TMDB";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import {
  Box,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

const Seasons = ({
  seasons,
  testSeason,
}: {
  seasons: Season[];
  testSeason: Season;
}) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>(testSeason);

  return (
    <Box bg={"blue"}>
      <Box bg={"dark"} p={20} my={10}>
        <Title size={"24px"} ml={"2%"} mb={10}>
          Season Menu
        </Title>
        <Group ml={"4%"} py={10}>
          {seasons?.map((season: Season) => (
            <Button
              key={season.id}
              onClick={() => setSelectedSeason(season)}
              color={selectedSeason.id == season.id ? "green" : "blue"}
            >
              {season.name}
            </Button>
          ))}
          <Button
            key={testSeason.id}
            onClick={() => setSelectedSeason(testSeason)}
            color={selectedSeason.id == testSeason.id ? "green" : "blue"}
          >
            test
          </Button>
        </Group>
      </Box>
      <Grid bg={"dark"} columns={10}>
        <Grid.Col span={4}>
          {selectedSeason.poster_path ? (
            <Group gap={0}>
              <Stack>
                <Title size={"24px"}>{selectedSeason.name} </Title>
                <Image
                  height={360}
                  width={240}
                  src={TMDB_Image_Helper(
                    selectedSeason.poster_path,
                    "original"
                  )}
                  alt={"No Image Available"}
                />
              </Stack>
              <Text ml={"4%"} miw={"30%"} mb={10}>
                {selectedSeason.overview
                  ? selectedSeason.overview
                  : "No Summary Available at this Time"}
              </Text>
              <Text ml={"4%"} w={"30%"}>
                Aired On {selectedSeason.air_date}
              </Text>
            </Group>
          ) : (
            <div />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 6, lg: 5 }}>
          <EpisodesGrid episodes={selectedSeason.episodes} />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

/*


*/
export default Seasons;

const EpisodesGrid = ({ episodes }: { episodes?: Episode[] }) => {
  if (!episodes) return <></>;
  return (
    <Box>
      <Title size="24">Episode List</Title>
      <SimpleGrid cols={{ base: 1, xl: 3 }} p={10} bg={""}>
        {episodes.map(({ episode_number, name, overview, id }: Episode) => (
          <Box key={id} p={8} m={5} bg={"dark"}>
            <Text>
              Episode {episode_number} - {name}{" "}
            </Text>
            <Text ml={"2%"} mt={10} pb={8} px={12}>
              {overview}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
/*

*/

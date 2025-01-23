"use client";

import Poster from "@/lib/entities/Poster";
import { UserCollections } from "@/lib/hooks/profile/useProfileList";
import ImageLink from "@/lib/ui/ImageLink/ImageLink";
import { Grid } from "@mantine/core";

const ProfileTestComponent = ({
  collection,
}: {
  collection: UserCollections;
}) => {
  const { name, games, movies, tvShows } = collection;
  return (
    <div>
      <p>{name}</p>
      <div>
        {games ? (
          <ContentGrid
            heading="Games"
            pathname="games/details"
            posters={games}
          />
        ) : (
          <p>no games</p>
        )}
        {movies ? (
          <ContentGrid heading="Movies" pathname="movies" posters={movies} />
        ) : (
          <p>no movies</p>
        )}
        {tvShows ? (
          <ContentGrid heading="Shows" pathname="tv" posters={tvShows} />
        ) : (
          <p>no shows</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTestComponent;

const ContentGrid = ({
  posters,
  pathname,
  heading,
}: {
  heading: string;
  pathname: "games/details" | "movies" | "tv";
  posters: Poster[];
}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <Grid columns={5}>
        {posters &&
          posters.map((poster: Poster) => (
            <Grid.Col span={1} key={poster.id}>
              <ImageLink pathname={pathname} poster={poster} height={360} />
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
};

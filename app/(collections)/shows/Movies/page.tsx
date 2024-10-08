import { Game_Cover } from "@/lib/entities/IGDB/Games";
import { Movie } from "@/lib/entities/TMDB";
import PageHandler from "@/lib/ui/Buttons/PageHandler";
import ItemCard from "@/lib/ui/Card/ItemCard";
import SearchForm from "@/lib/ui/forms/SearchForm/SearchForm";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import Resize_Image from "@/utils/helpers/Resize_IGDB";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { SimpleGrid } from "@mantine/core";
import { notFound } from "next/navigation";
const numPages = 20;
const currPage = 9;

const genres = [
  { label: "G1", value: "G1" },
  { label: "G2", value: "G2" },
  { label: "G3", value: "G3" },
  { label: "G4", value: "G4" },
  { label: "T1", value: "T1" },
  { label: "T2", value: "T2" },
  { label: "T3", value: "T3" },
  { label: "T4", value: "T4" },
];
interface Poster {
  id: number;
  title: string;
  image?: string;
}
export async function fetchPosters(endpoint: string) {
  const tmdb_Api_Client = new TMDB_Api_Client("", "GET");
  const { results: shows } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: endpoint,
  });
  if (!shows) throw notFound();

  console.log(shows);
  const posters: Poster[] = shows.map((movie: Movie) => {
    const poster: Poster = {
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
    };

    return poster;
  });

  return posters;
}

const MoviesHome = async () => {
  const posters: Poster[] = await fetchPosters("discover/movie");
  return (
    <div>
      <SearchForm formHeader="Games" items={genres} />
      <SimpleGrid cols={5}>
        {posters.map(({ id, title, image }) => (
          <ItemCard
            key={id}
            id={id}
            title={title}
            image={image && TMDB_Image_Helper(image)}
          />
        ))}
      </SimpleGrid>
      <PageHandler numPages={numPages} currPage={currPage} />
    </div>
  );
};

export default MoviesHome;

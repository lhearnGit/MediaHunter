import { Game_Cover } from "@/lib/entities/IGDB/Games";
import { Movie } from "@/lib/entities/TMDB";
import PageHandler from "@/lib/ui/PageHandler";
import ItemCard from "@/lib/ui/Card/CardLink";
import SearchForm from "@/lib/ui/forms/SearchForm/SearchForm";
import { TMDB_Api_Client } from "@/services/tmdb-api-client";
import Resize_Image from "@/utils/helpers/Resize_IGDB";
import { TMDB_Image_Helper } from "@/utils/helpers/TMDB_Image_Helper";
import { SimpleGrid } from "@mantine/core";
import { notFound } from "next/navigation";
import CardLink from "@/lib/ui/Card/CardLink";
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
  const tmdb_Api_Client = new TMDB_Api_Client("GET");
  const {
    results: shows,
    total_pages,
    total_results,
  } = await tmdb_Api_Client.TMDB_Fetch_Pages<Movie>({
    endpoint: endpoint,
  });
  if (!shows) throw notFound();

  const posters: Poster[] = shows.map((movie: Movie) => {
    const poster: Poster = {
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
    };

    return poster;
  });

  return { posters, total_pages, total_results };
}

const MoviesHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else query.append(key, value);
    }
  }
  const { posters, total_pages, total_results } = await fetchPosters(
    `discover/movie${query.get("page") ? `?page=${query.get("page")}` : ""}`
  );

  return (
    <div>
      <SearchForm formHeader="Games" items={genres} />
      <SimpleGrid cols={5}>
        {posters.map(({ id, title, image }) => (
          <CardLink
            key={id}
            id={id}
            title={title}
            image={image && TMDB_Image_Helper(image, "w780")}
          />
        ))}
      </SimpleGrid>
      <PageHandler numPages={total_pages} />
    </div>
  );
};

export default MoviesHome;

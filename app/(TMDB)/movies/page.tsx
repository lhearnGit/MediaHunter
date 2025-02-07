import PageHandler from "@/lib/ui/PageHandler";
/*import {
  fetch_TMDB_Countries,
  fetch_TMDB_Genres,
} from "@/utils/fetches/TMDB/fetchConfigs";*/
import { fetchPosters } from "@/fetches/TMDB/fetchPosters";
import { Build_Search_String } from "@/utils/helpers/TMDB_Search_Helper";
import TMDBGallery from "../_components/TMDBGallery/TMDBGallery";
import classes from "./moviespage.module.css";
const MoviesGalleryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) return;
      else params.append(key, value);
    }
  }

  const searchString = Build_Search_String({
    page: params.get(`page`),
    genre: params.get("genre"),
    year: params.get("first_air_date_year"),
    country: params.get("country"),
  });

  //const genres = await fetch_TMDB_Genres("movie");
  //const countries = await fetch_TMDB_Countries();
  const { total_pages, posters } = await fetchPosters("movie", searchString); //initial data

  return (
    <div className={classes.wrapper}>
      <div>Param Container</div>
      <h1 className={classes.heading}>Movies Gallery Page</h1>
      <TMDBGallery pathname="movies" posters={posters} />
      <PageHandler
        numPages={total_pages && total_pages > 500 ? 500 : total_pages} //tmdb pages args cannot exceed page 500
      />
    </div>
  );
};

export default MoviesGalleryPage;

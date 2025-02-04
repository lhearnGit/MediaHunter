import PageHandler from "@/lib/ui/PageHandler";
import { fetchPosters } from "@/utils/fetches/TMDB/fetchPosters";
import { Build_Search_String } from "@/utils/helpers/TMDB_Search_Helper";

import TMDBGallery from "../_components/TMDBGallery/TMDBGallery";
import classes from "./tvgallerypage.module.css";
const TVGalleryPage = async ({
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

  const { total_pages, posters } = await fetchPosters("tv", searchString); //initial data

  return (
    <div className={classes.wrapper}>
      <div>Param Container</div>
      <h1 className={classes.heading}>Movies Gallery Page</h1>
      <div className={classes.cardContainer}>
        <TMDBGallery posters={posters} pathname="tv" />
      </div>
      <PageHandler numPages={total_pages} />
    </div>
  );
};

export default TVGalleryPage;

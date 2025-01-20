import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import SearchParamButton from "@/lib/ui/SearchParamButton/SearchParamButton";
import classses from "./SearchParamContainer.module.css";
import { fetchGenres } from "@/utils/fetches/IGDB/fetchGenres";
import { fetchThemes } from "@/utils/fetches/IGDB/fetchThemes";

const SearchParamContainer = async () => {
  const genres = await fetchGenres();
  const themes = await fetchThemes();

  return (
    <div className={classses.wrapper}>
      <h1 className={classses.title}>Filter</h1>
      <div className={classses.contentArea}>
        <div className={classses.paramWrapper}>
          <h2 className={classses.paramHeader}>Genres</h2>
          {genres.map(({ name, id }: IGDB_Genre) => (
            <SearchParamButton
              label={name}
              paramKey={"genres"}
              paramValue={id.toString()}
              key={id}
            />
          ))}
        </div>
        <div className={classses.paramWrapper}>
          <h2 className={classses.paramHeader}>Themes</h2>
          {themes.map(({ id, name }: Theme) => (
            <SearchParamButton
              label={name}
              paramKey={"themes"}
              paramValue={id.toString()}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchParamContainer;

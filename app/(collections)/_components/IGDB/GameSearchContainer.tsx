import classses from "./GameSearchContainer.module.css";
import { fetchGenres } from "@/utils/fetches/IGDB/fetchGenres";
import { fetchThemes } from "@/utils/fetches/IGDB/fetchThemes";
import GameSearchForm from "../games/_component/SearchForm/GameSearchForm";

const GameSearchContainer = async () => {
  const genres = await fetchGenres();
  const themes = await fetchThemes();

  return (
    <div className={classses.wrapper}>
      <div className={classses.contentArea}>
        <GameSearchForm genres={genres} themes={themes} />
      </div>
    </div>
  );
};

export default GameSearchContainer;

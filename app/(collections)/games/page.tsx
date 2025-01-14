import { searchGames } from "@/utils/fetches/IGDB/searchGames";
import BrowseGames from "./_component/BrowseGames";
import GameParamSection from "./_component/GameParamSection";

const GamesHome = async ({
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
  if (!params.has("page") || params.get("page") == null) {
    params.append("page", "1");
  }

  const theme = params.get("themes");
  const genre = params.get("genres");

  const page = parseInt(params.get("page")!); //wont return null, as if the page doesn't have a number it will be set above, does not handle NaN errors - >1a - > failure
  const page_size = 10;

  const games = await searchGames(page, page_size, genre, theme);
  return (
    <div>
      <GameParamSection />
      <br />
      <br />
      <br />

      <BrowseGames games={games} />
    </div>
  );
};

export default GamesHome;

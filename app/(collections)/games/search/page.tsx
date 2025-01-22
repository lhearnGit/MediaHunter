import { IGDB_Fetch } from "@/services/igdb-api-client-v2";
import { isValidUrlParam } from "@/utils/zodSchemas/UrlSchema";
import Link from "next/link";

import { Game } from "@/lib/entities/IGDB";
import { setQuery } from "@/utils/fetches/IGDB/Queries/GameHomeQueries";
import SearchParamContainer from "../../_components/SearchParamContainer";
import BrowseGames from "../_component/BrowseGames";
import classes from "../GamesHomePage.module.css";
import SearchWithButton from "@/lib/ui/Search/SearchWithButton";
import { Group, Container } from "@mantine/core";

const GameSearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      //validate key

      let validate = isValidUrlParam.safeParse({ key, value });
      if (value && validate.success)
        params.append(validate.data.key, validate.data.value.toString());
    }
  }
  let page: number = 1;
  if (!params.has("page") || params.get("page") == null || NaN) {
    params.append("page", "1");
  } else {
    page = parseInt(params.get("page")!); //null and NaN cases are handled above
  }

  const theme = params.get("themes");
  const genre = params.get("genres");
  console.log(params);
  const games = await IGDB_Fetch<Game>({
    endpoint: "games",
    query: setQuery(page, "search", genre, theme),
  });

  return (
    <div>
      <SearchParamContainer />
      <BrowseGames games={games} />
    </div>
  );
};

export default GameSearchPage;

type PagePath = {
  href: string;
  label: string;
};
const links: PagePath[] = [
  { href: "/games", label: "Games Home" },
  { href: "/games?option=recent", label: "Recent Releases" },
  { href: "/games?option=upcoming", label: "Upcoming Releases" },
  { href: "/games/search", label: "Search" },
];

interface Props {
  links: PagePath[];
}
const LinkBar = ({ links }: Props) => {
  "use client";

  return (
    <Container size="lg">
      <Group gap={2} visibleFrom="xs" justify="space-between">
        <Group>
          {links.map(({ href, label }: PagePath) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </Group>
      </Group>
    </Container>
  );
};

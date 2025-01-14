"use client";
import { Game } from "@/lib/entities/IGDB";
import { Button, Group } from "@mantine/core";
import { round } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { MediaSummary } from "../../_components/MediaSummary";
import IGDB_Image_Helper from "@/utils/helpers/IGDB_Image_Helper";

const BrowseGames = ({ games }: { games: Game[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = new URLSearchParams(searchParams);
  if (!query.has("page")) query.append("page", "1");
  if (query.get("page") == null) query.set("page", "1");
  const page = parseInt(query.get("page")!);
  const page_length = 10;

  const changePage = (key: string, value: string) => {
    query.set(key, value);
    router.replace(`${pathname}?${query.toString()}`);
  };

  useEffect(() => {}, [searchParams]);

  return (
    <div>
      <Group>
        <Button
          disabled={query.get("page") == "1" ? true : false}
          onClick={() => {
            console.log("prev page");
            changePage("page", (page - 1).toString());
          }}
        >
          prev page
        </Button>
        <Button
          disabled={games.length < page_length ? true : false} //basic end checking, if there are less than the page lengths results there are no more pages
          onClick={() => {
            console.log("next page");
            changePage("page", (page + 1).toString());
          }}
        >
          next page
        </Button>
      </Group>
      {games.map(
        ({
          id,
          name,
          cover,
          genres,
          themes,
          summary,
          rating,
          rating_count,
        }: Game) => (
          <MediaSummary
            key={id}
            id={id}
            image={
              cover?.url
                ? IGDB_Image_Helper(cover?.url, "cover_big")
                : "/images/notFound.jpg"
            }
            title={name}
            genres={genres}
            themes={themes}
            summary={summary}
            rating={round(rating, 1)}
            rating_count={rating_count}
            pagePath="games"
          />
        )
      )}
    </div>
  );
};

export default BrowseGames;

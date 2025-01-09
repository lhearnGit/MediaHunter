"use client";
import { Game } from "@/lib/entities/IGDB";
import usePaginatedGames from "@/lib/hooks/paginatedGames/usePaginatedGames";
import { round } from "lodash";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { MediaSummary } from "../../_components/MediaSummary";
import { Group } from "@mantine/core";
import { useEffect } from "react";

const BrowseGames = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = new URLSearchParams(searchParams);
  if (!query.has("page")) query.append("page", "1");
  if (query.get("page") == null) query.set("page", "1");
  const page = parseInt(query.get("page")!);
  const page_length = 10;
  const { data, error, isLoading } = usePaginatedGames();

  const changePage = (key: string, value: string) => {
    query.set(key, value);
    router.replace(`${pathname}?${query.toString()}`);
  };

  useEffect(() => {}, [searchParams]);

  if (isLoading) return <p>is Loading...</p>;
  if (!data) return notFound();
  if (error) return notFound();
  return (
    <div>
      {isLoading && <p>is Loading...</p>}
      <Group>
        <button
          disabled={query.get("page") == "1" ? true : false}
          onClick={() => {
            console.log("prev page");
            changePage("page", (page - 1).toString());
          }}
        >
          prev page
        </button>
        <button
          disabled={data.length < page_length ? true : false} //basic end checking, if there are less than the page lengths results there are no more pages
          onClick={() => {
            console.log("next page");
            changePage("page", (page + 1).toString());
          }}
        >
          next page
        </button>
      </Group>
      {data.map(
        ({ id, name, cover, genres, themes, summary, rating }: Game) => (
          <MediaSummary
            key={id}
            id={id}
            image={cover.url}
            title={name}
            genres={genres}
            themes={themes}
            summary={summary}
            rating={round(rating, 1)}
            pagePath="games"
          />
        )
      )}
    </div>
  );
};

export default BrowseGames;

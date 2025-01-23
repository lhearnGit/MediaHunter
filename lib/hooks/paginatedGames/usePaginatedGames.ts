"use client";

import { Game } from "@/lib/entities/IGDB";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const usePaginatedGames = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const fetchGames = async () => {
    console.log("fetching page " + page);
    const res = await fetch(`/api/infinite?${searchParams}`);
    return res.json();
  };
  const { data, isLoading, isError, error, isFetching, isPending } = useQuery<
    Game[]
  >({
    queryKey: [
      "games",
      {
        genres: searchParams.get("genres"),
        themes: searchParams.get("themes"),
        page: searchParams.get("page"),
      },
    ],
    queryFn: () => fetchGames(),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isPending,
  };
};

export default usePaginatedGames;

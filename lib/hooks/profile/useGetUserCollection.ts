"use client";
import { Poster } from "@/lib/entities/Poster";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserCollection {
  movies: Poster[];
  tvShows: Poster[];
  games: Poster[];
}

export function useGetUserCollection(userId: string | undefined) {
  const {
    data: result,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [`userCollection`],
    queryFn: async () => await axios.get(`/api/user/${userId}`), //query will not be enabled if session is undefined, a session must have an ID
    enabled: userId !== undefined,
    staleTime: 100 * 60 * 5,
  });
  const collection: UserCollection = result?.data;

  return { collection, error, isFetching, isLoading };
}

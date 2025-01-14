"use client";
import { Game } from "@/lib/entities/IGDB";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserCollections {
  movies: ShowResponse[];
  shows: ShowResponse[];
  games: Game[];
}
interface ShowResponse {
  name: string;
  id: number;
  imageUrl: string;
}

export function useProfileList(id: string) {
  const {
    data: profileData,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [`profileList`],
    queryFn: async () =>
      await axios.get("/api/user/" + "66d73678a5ae02f237ead4d9"),
  });
  const profile: UserCollections = profileData?.data;

  return { profile, error, isFetching, isLoading };
}

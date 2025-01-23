"use client";
import Poster from "@/lib/entities/Poster";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserCollections {
  name: string;
  movies: Poster[];
  tvShows: Poster[];
  games: Poster[];
}

export function useProfileList(id: string) {
  const {
    data: profileData,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [`profileList`],
    queryFn: async () => await axios.get(`/api/user/${id}`),
  });
  const profile: UserCollections = profileData?.data;
  //console.log(profile);

  return { profile, error, isFetching, isLoading };
}

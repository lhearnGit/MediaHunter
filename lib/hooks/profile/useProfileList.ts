import { Game } from "@/lib/entities/IGDB";
import { TV } from "@/lib/entities/TMDB";
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

async function getUserList(id: string) {
  return await axios.get("/api/user/" + id);
}
export function useProfileList(id: string) {
  const { data, error, isFetching, isLoading } = useQuery({
    queryKey: [`profileList`],
    queryFn: () => getUserList(id),
  });
  const profile: UserCollections = data?.data;

  return { profile, error, isFetching, isLoading };
}

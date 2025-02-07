import { Poster } from "@/lib/entities/Poster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ProfileData {
  data: Poster;
  addTo: boolean;
}

const userUpdateUserCollection = (
  userId: string,
  endpoint: "games" | "movies" | "shows"
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["mutateUserCollection"],
    mutationFn: ({ data, addTo }: ProfileData) =>
      axios.patch("/api/user/" + userId + `/${endpoint}`, {
        data,
        addTo,
      }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["userCollection"] });
    },
  });
};

export default userUpdateUserCollection;

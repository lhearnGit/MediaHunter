import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ProfileData {
  data: { id: number; name: string; url: string };
  addTo: boolean;
}

const useUpdateCollection = (
  userId: string,
  endpoint: "games" | "movies" | "shows"
) => {
  return useMutation({
    mutationFn: ({ data, addTo }: ProfileData) =>
      axios.patch("/api/user/" + userId + `/${endpoint}`, {
        data,
        addTo,
      }),
  });
};

export default useUpdateCollection;

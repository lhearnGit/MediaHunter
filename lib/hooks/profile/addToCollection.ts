import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ProfileData {
  userId: string;
  endpoint: "games" | "movies" | "shows";
  data: { id: number; name: string; url: string };
  addTo: boolean;
}

const addToCollection = useMutation({
  mutationFn: ({ userId, endpoint, data, addTo }: ProfileData) => {
    return axios.patch("/api/user/" + userId + `/${endpoint}`, {
      data,
      addTo,
    });
  },
});

export default addToCollection;

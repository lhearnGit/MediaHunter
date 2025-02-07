"use client";
import { Poster } from "@/lib/entities/Poster";
import { useGetUserCollection } from "@/lib/hooks/profile/useGetUserCollection";
import useUpdateUserCollection from "@/lib/hooks/profile/useUpdateUserCollection";
import { Button, Loader } from "@mantine/core";
import { useEffect, useState } from "react";

const AddToUserList = ({
  id,
  name,
  imageUrl,
  userId,
  endpoint,
}: {
  id: number;
  name: string;
  imageUrl: string | undefined;
  userId: string | undefined;
  endpoint: "games" | "movies" | "shows";
}) => {
  const { collection, error, isFetching, isLoading } =
    useGetUserCollection(userId);
  const updateCollection = useUpdateUserCollection(`${userId}`, `${endpoint}`);

  const [items, setItems] = useState<Poster[]>();

  useEffect(() => {
    const games = collection?.games;
    games ? setItems([...games]) : setItems([]);
  }, [collection]);

  if (isLoading || isFetching) return <Loader />;
  if (items?.find((item) => item.id == id)) return <p>in Library</p>;
  return (
    <Button
      onClick={() => {
        updateCollection.mutate({
          data: { id: Number(id), name, imageUrl }, //Prisma has issue thinking this is a string if not explicitly handled
          addTo: true,
        });
      }}
    >
      Add to Your Collection
    </Button>
  );
};

export default AddToUserList;

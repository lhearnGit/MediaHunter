"use client";
import { Button, Group } from "@mantine/core";
import React from "react";
import { ConfirmDeleteDialogue } from "@/lib/ui/ConfirmDeleteDialogue";
import axios from "axios";
import { Profile_Object_Payload } from "@/lib/entities/DBStorage/Collection_Payload";

const ProfileActions = ({
  userId,
  endpoint,
  payload,
}: {
  userId: string;
  endpoint: string;
  payload: Profile_Object_Payload;
}) => {
  function handleDelete() {
    axios.patch(`/api/user/${userId}/${endpoint}`, {
      options: "REMOVE",
      itemId: Number(payload.itemId), //Even though typing is already "number", if not type casted prisma throws an error an determines this to be a string
    });
  }
  function handleAdd() {
    axios.patch(`/api/user/${userId}/${endpoint}`, {
      options: "",

      //Even though typing is already "number", if not type casted prisma throws an error an determines this to be a string
      itemId: Number(payload.itemId),
      name: payload.name,
      imageUrl: payload.imageUrl,
    });
  }
  return (
    <Group justify={"space-evenly"}>
      <Button bg="green" onClick={handleAdd}>
        Add
      </Button>
      <ConfirmDeleteDialogue option="Delete" deleteFunction={handleDelete} />
    </Group>
  );
};

export default ProfileActions;

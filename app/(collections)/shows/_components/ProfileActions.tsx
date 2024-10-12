"use client";
import { Button, Flex, Stack } from "@mantine/core";
import React from "react";
import { ConfirmDeleteDialogue } from "@/lib/ui/ConfirmDeleteDialogue";

function handleDelete() {
  return console.log("Deleted...");
}
function handleAdd() {
  return console.log("added..");
}
const ProfileActions = () => {
  return (
    <Flex justify={"space-evenly"}>
      <Button bg="green" onClick={handleAdd}>
        Add
      </Button>
      <ConfirmDeleteDialogue option="Delete" deleteFunction={handleDelete} />
    </Flex>
  );
};

export default ProfileActions;

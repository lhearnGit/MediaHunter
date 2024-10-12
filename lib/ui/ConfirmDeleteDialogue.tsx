"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

interface DialogueProps {
  option: "Delete";
  deleteFunction: () => void;
}
export function ConfirmDeleteDialogue({
  option,
  deleteFunction,
}: DialogueProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Confirm ${option}`}
        centered
      >
        <Button
          bg={"red"}
          onClick={() => {
            deleteFunction();
            close();
          }}
        >
          {" "}
          Remove{" "}
        </Button>
        <Button bg={"gray"} onClick={close}>
          {" "}
          Cancel{" "}
        </Button>
      </Modal>

      <Button bg={"red"} onClick={open}>
        {option}
      </Button>
    </>
  );
}

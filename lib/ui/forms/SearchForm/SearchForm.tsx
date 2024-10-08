"use client";
import {
  Button,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Space,
  Text,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import classes from "./searchForm.module.css";
import OptionGroup from "../Filters/OptionGroup";
import Expander from "../../Buttons/Expander";

interface Item {
  label: string;
  value: string;
}
interface FormData {
  genres?: string;
  themes?: string;
}
const SearchForm = ({
  formHeader,
  items,
}: {
  formHeader: string;
  items: Item[];
}) => {
  return (
    <Container size={"xl"} className={classes.secondary}>
      <Text> Search for {formHeader} </Text>
      <Space h="md" />
      <Group justify="space-evenly">
        <Expander triggerLabel="Group 1">
          <OptionGroup items={items} heading="Group 1" />
        </Expander>
        <Expander triggerLabel="Group 2">
          <OptionGroup items={items} heading="Group 2" />
        </Expander>
        <Expander triggerLabel="Group 3">
          <OptionGroup items={items} heading="Group 3" />
        </Expander>
      </Group>
      <Space h="md" />
      <Button type="submit" onClick={() => console.log("submitted")}>
        Submit
      </Button>
    </Container>
  );
};

export default SearchForm;

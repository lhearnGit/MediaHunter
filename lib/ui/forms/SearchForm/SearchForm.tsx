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
import CheckBox from "../../Buttons/checkbox/Checkbox";
import classes from "./searchForm.module.css";
import OptionGroup from "../Filters/OptionGroup";

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
  const theme = useMantineTheme();
  return (
    <Container size={"xl"} className={classes.secondary}>
      <Text> Search for {formHeader} </Text>
      <Space h="md" />
      <Flex gap={"sm"}>
        <OptionGroup items={items} />
      </Flex>
      <Space h="md" />
      <Button type="submit" onClick={() => console.log("submitted")}>
        Submit
      </Button>
    </Container>
  );
};

export default SearchForm;

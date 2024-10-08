import { Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";
import CheckBox from "../../Buttons/checkbox/Checkbox";
interface Item {
  label: string;
  value: string;
}
const OptionGroup = ({
  items,
  heading,
}: {
  items: Item[];
  heading: string;
}) => {
  return (
    <Stack>
      <Flex>
        {" "}
        <SimpleGrid cols={5}>
          {items.map((item) => (
            <CheckBox key={item.value} label={item.label} value={item.value} />
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
};

export default OptionGroup;

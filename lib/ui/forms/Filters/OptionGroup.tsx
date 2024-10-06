import { SimpleGrid } from "@mantine/core";
import React from "react";
import CheckBox from "../../Buttons/checkbox/Checkbox";
interface Item {
  label: string;
  value: string;
}
const OptionGroup = ({ items }: { items: Item[] }) => {
  return (
    <SimpleGrid cols={5}>
      {items.map((item) => (
        <CheckBox key={item.value} label={item.label} value={item.value} />
      ))}
    </SimpleGrid>
  );
};

export default OptionGroup;

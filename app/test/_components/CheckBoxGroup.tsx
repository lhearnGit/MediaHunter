"use client";
import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import { Checkbox, SimpleGrid } from "@mantine/core";
import React, { useState } from "react";

const CheckboxGroup = ({ items }: { items: IGDB_Genre[] | Theme[] }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const handleChange = (option: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else if (prev.length < 2) {
        return [...prev, option];
      }
      return prev;
    });
  };
  return (
    <Controller
      name="genres"
      control={control}
      render={({ field: { onChange } }) => (
        <SimpleGrid cols={5}>
          {items.map((item: IGDB_Genre | Theme) => (
            <Checkbox
              key={item.id}
              label={item.name}
              checked={checkedItems.includes(item.id.toString())}
              onChange={() => handleChange(item.id.toString())}
            />
          ))}
        </SimpleGrid>
      )}
    />
  );
};

export default CheckboxGroup;

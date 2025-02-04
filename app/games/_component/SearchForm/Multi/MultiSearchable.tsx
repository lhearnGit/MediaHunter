"use client";
import {
  Combobox,
  Group,
  InputBase,
  Stack,
  Text,
  useCombobox,
} from "@mantine/core";
import { useState } from "react";
import { ParamPill } from "./ParamPill";

export type Param = {
  id: number | string;
  key: string;
  name: string;
};
interface Props {
  items: Param[];
  title?: string;
  placelabel: string;

  removeValue?: (value: Param) => void;
  selectValue?: (value: Param) => void;
}

function filterSearchParams(params: Param[], searchString: string) {
  const filteredParams = params.filter(({ name }: Param) =>
    name.toLowerCase().includes(searchString.toLowerCase())
  );
  return filteredParams;
}
export function MultiSearchable({
  items,
  placelabel,
  title,
  selectValue,
  removeValue,
}: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [values, setValues] = useState<Param[]>([]);

  const handleValueSelect = (val: Param) => {
    selectValue && selectValue(val);
    setValues((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };

  const handleValueRemove = (val: Param) => {
    removeValue && removeValue(val);
    setValues((current) => current.filter((v) => v !== val));
  };

  const [search, setSearch] = useState("");

  const filteredItems: Param[] = filterSearchParams(items, search);

  const searchResults = filteredItems.map((item: Param) => {
    return (
      <Combobox.Option
        onClick={() => handleValueSelect(item)}
        value={item.id.toString()}
        key={item.id + item.key}
      >
        <Text>{item.name}</Text>
      </Combobox.Option>
    );
  });

  return (
    <Stack>
      {removeValue ? (
        <></>
      ) : (
        <>
          <h2>{title}</h2>
          <Group>
            {values &&
              values.map((item: Param) => (
                <ParamPill
                  key={item.id + item.name}
                  value={item}
                  label={item.name}
                  onRemove={() => handleValueRemove(item)}
                />
              ))}
          </Group>
        </>
      )}
      <Combobox store={combobox} withinPortal={false}>
        <Combobox.Target>
          <InputBase
            miw={300}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();

              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(search || "");
            }}
            placeholder={placelabel}
          />
        </Combobox.Target>

        <Combobox.Dropdown maw={300}>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {filteredItems.length > 0 ? (
              searchResults
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
}

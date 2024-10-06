import { useState } from "react";
import { Checkbox } from "@mantine/core";

export default function CheckBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label={label}
      value={value}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}

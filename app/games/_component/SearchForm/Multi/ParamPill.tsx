"use client";
import { CloseButton } from "@mantine/core";
import classes from "./parampill.module.css";
import { Param } from "./MultiSearchable";

interface ParamPillProps extends React.ComponentPropsWithoutRef<"div"> {
  value: Param;
  label: string;
  onRemove?: () => void;
}

export function ParamPill({
  value,
  label,
  onRemove,
  ...others
}: ParamPillProps) {
  return (
    <div className={classes.pill} {...others}>
      <div className={classes.label}>{label}</div>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        color="gray"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </div>
  );
}

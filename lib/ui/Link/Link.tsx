import { Button } from "@mantine/core";
import Link from "next/link";
import classes from "./link.module.css";
import React from "react";

export default function NavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Button component={Link} href={href} className={classes.link}>
      {label}
    </Button>
  );
}

"use client";
// theme.ts
import cx from "clsx";
import classes from "./theme.module.css";
import {
  Container,
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from "@mantine/core";

const themeOverride = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === "responsive" }),
      }),
    }),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

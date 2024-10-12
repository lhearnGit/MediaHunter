"use client";
import { Badge } from "@mantine/core";
import React from "react";

const StyledBadges = ({ label, color }: { label: string; color: string }) => {
  return <Badge color={color}>{label}</Badge>;
};

export default StyledBadges;

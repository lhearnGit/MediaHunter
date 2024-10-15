"use client";
import { useProfileList } from "@/lib/hooks/profile/useProfileList";
import React from "react";

const UserBooksPage = () => {
  const { profile, isLoading, error } = useProfileList(
    "66d73678a5ae02f237ead4d9"
  );
  return <div>UserBooksPage</div>;
};

export default UserBooksPage;

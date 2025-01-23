"use client";
import { Button } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchParamButton = ({
  paramValue,
  paramKey,
  label,
}: {
  paramKey: string;
  label: string;
  paramValue: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = new URLSearchParams(searchParams);

  function onClick() {
    const param = currentParams.get(paramKey);
    switch (param) {
      case null: {
        //if the key is value is null, add it
        currentParams.append(paramKey, paramValue);
        break;
      } //if the value is already in the search param, delete it
      case paramValue: {
        currentParams.delete(paramKey);
        console.log(`deleting...`);
        break;
      }
      //change the value
      default: {
        currentParams.set(paramKey, paramValue);
        break;
      }
    }

    return router.replace(`${pathname}?${currentParams.toString()}`);
  }

  return (
    <Button
      m={5}
      onClick={onClick}
      bg={searchParams.has(paramKey, paramValue) ? "grape" : ""}
    >
      {label}
    </Button>
  );
};

export default SearchParamButton;

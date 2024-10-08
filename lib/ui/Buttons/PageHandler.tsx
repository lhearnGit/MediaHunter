"use client";
import { Group, Pagination, Space } from "@mantine/core";
import { useState } from "react";

const PageHandler = ({
  currPage,
  numPages,
}: {
  currPage: number;
  numPages: number;
}) => {
  const [currentPage, setCurrentPage] = useState(currPage);

  return (
    <>
      <Space h="md" />
      <Pagination.Root
        total={numPages}
        value={currentPage}
        onChange={setCurrentPage}
        defaultValue={currPage}
      >
        <Group gap={5} justify="center">
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Group>
      </Pagination.Root>
    </>
  );
};

export default PageHandler;

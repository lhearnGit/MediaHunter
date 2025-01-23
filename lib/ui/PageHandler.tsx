"use client";
import { Group, Pagination, Space } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PageHandler = ({ numPages }: { numPages?: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = new URLSearchParams(searchParams);
  const [currentPage, setCurrentPage] = useState((): number => {
    const pageParam = query.get("page");

    if (!pageParam) {
      query.set("page", "1");
      return 1;
    } else {
      return parseInt(query.get("page")!); //use zod to ensure a number is entered
    }
  });

  const handlePageChange = (value: number) => {
    query.set("page", value.toString());
    router.replace(`${pathname}?${query.toString()}`);
    setCurrentPage(value);
  };

  return (
    <>
      <Space h="md" />
      <Pagination.Root
        total={numPages ? numPages : 1}
        value={currentPage}
        onChange={(value) => handlePageChange(value)}
        defaultValue={1}
      >
        <Group gap={5} justify="center">
          <Pagination.Previous
            onChange={(e) => handlePageChange(parseInt(e.currentTarget.value))}
          />
          <Pagination.Items />
          <Pagination.Next
            onChange={(e) => handlePageChange(parseInt(e.currentTarget.value))}
          />
        </Group>
      </Pagination.Root>
    </>
  );
};

export default PageHandler;

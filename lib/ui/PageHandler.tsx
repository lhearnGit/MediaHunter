"use client";
import { Group, Pagination, Space } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PageHandler = ({ numPages }: { numPages?: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = new URLSearchParams(searchParams);

  const handlePageChange = (value: number) => {
    query.set("page", value.toString());
    router.replace(`${pathname}?${query.toString()}`);
    setCurrentPage(value);
  };

  useEffect(() => {
    const pageParam = query.get("page");
    if (!pageParam) {
      query.set("page", "1");
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(query.get("page")!));
    }
  }, []);

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

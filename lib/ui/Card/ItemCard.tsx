"use client";
import { Card, Image } from "@mantine/core";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemCard({
  image,
  title,
  id,
}: {
  id: number;
  image?: string;
  title?: string;
}) {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={"300"} alt={title} />
        </Card.Section>
      </Card>
    </Link>
  );
}

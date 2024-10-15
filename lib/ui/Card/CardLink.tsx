"use client";
import { Card, Image } from "@mantine/core";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CardLink({
  image,
  title,
  id,
  mediaType,
}: {
  id: number | string;
  image?: string;
  title?: string;
  mediaType?: "movies" | "tv" | "game";
}) {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${mediaType == undefined ? "" : mediaType + "/"}${id}`}
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} alt={title} />
        </Card.Section>
      </Card>
    </Link>
  );
}

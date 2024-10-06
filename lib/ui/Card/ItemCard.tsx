"use client";
import { Card, Image, Text, Group } from "@mantine/core";
import NavLink from "../Link/Link";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ItemCard({
  image,
  title,
  details,
  id,
}: {
  id: number;
  image: string;
  title: string;
  details: string;
}) {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={"244"} alt="Norway" />
        </Card.Section>
      </Card>
    </Link>
  );
}

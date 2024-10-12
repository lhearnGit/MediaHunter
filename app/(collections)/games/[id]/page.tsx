import React from "react";
import { GameContent } from "../../_components/GameContent";
import { Container, Text, Space, Skeleton, Grid } from "@mantine/core";
import ItemCard from "@/lib/ui/Card/CardLink";
interface CardData {
  id: number;
  title: string;
  image: string;
  details: string;
}
const Items: CardData[] = [
  {
    id: 1,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 11,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 111,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 21,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 13,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 311,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
];
const GamesDetailsPage = ({ params }: { params: { id: number } }) => {
  return (
    <Container size={"xl"}>
      <GameContent title="Game Title" />
    </Container>
  );
};

export default GamesDetailsPage;

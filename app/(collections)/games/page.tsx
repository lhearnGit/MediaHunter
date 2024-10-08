import PageHandler from "@/lib/ui/Buttons/PageHandler";
import ItemGrid from "@/lib/ui/Card/CardGrid";
import SearchForm from "@/lib/ui/forms/SearchForm/SearchForm";
import React from "react";

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
  {
    id: 3151,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1215,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1412315,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 551,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 123152,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 41,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1231,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 511,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 12419,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 13475,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 4351,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1435,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 135654,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1562436,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1347555,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 43521,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 13435,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 1353654,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
  {
    id: 15621436,
    title: "Norway",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    details: "Some Details",
  },
];
const numPages = 20;
const currPage = 9;
interface Item {
  label: string;
  value: string;
}
interface CardData {
  id: number;
  title: string;
  image: string;
  details: string;
}

const genres = [
  { label: "G1", value: "G1" },
  { label: "G2", value: "G2" },
  { label: "G3", value: "G3" },
  { label: "G4", value: "G4" },
  { label: "T1", value: "T1" },
  { label: "T2", value: "T2" },
  { label: "T3", value: "T3" },
  { label: "T4", value: "T4" },
];

const GamesHome = () => {
  return (
    <div>
      <SearchForm formHeader="Games" items={genres} />
      <ItemGrid items={Items} />
      <PageHandler numPages={numPages} currPage={currPage} />
    </div>
  );
};

export default GamesHome;

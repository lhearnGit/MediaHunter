import { SimpleGrid } from "@mantine/core";
import ItemCard from "./ItemCard";
interface CardData {
  id: number;
  title: string;
  image: string;
}
const CardGrid = ({ items }: { items: CardData[] }) => {
  return (
    <SimpleGrid cols={5}>
      {items.map((item: CardData) => (
        <ItemCard id={item.id} title={item.title} image={item.image} />
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;

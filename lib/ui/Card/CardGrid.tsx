import { SimpleGrid } from "@mantine/core";
import ItemCard from "./ItemCard";
interface CardData {
  id: number;
  title: string;
  image: string;
  details: string;
}
const ItemGrid = ({ items }: { items: CardData[] }) => {
  return (
    <SimpleGrid cols={5}>
      {items.map((item: CardData) => (
        <ItemCard
          id={item.id}
          title={item.title}
          image={item.image}
          details={item.details}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemGrid;

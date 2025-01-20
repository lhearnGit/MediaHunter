import BannerCarousel from "@/lib/ui/Carousel/BannerCarousel";
import { Features } from "@/lib/ui/Sections/Main/features/Features";

interface Banner {
  title: string;
  href: string;
  description: string;
  collectionType: string;
}
const banners: Banner[] = [
  {
    title: "Nothing to Play?",
    description:
      "Easily, Search, Discover, and Follow games from IGDB's database of hundreds of thousands of games!",

    href: "/games",
    collectionType: "Games",
  },
  {
    title: "Dont know what to watch? ",
    description:
      "Cant Keep up with all those streaming serivces? by using TMDBs API you can find out about all kinds of new releases and get reviews from real people!",
    href: "/shows",
    collectionType: "shows",
  },
];

export default function Home() {
  return (
    <div>
      <BannerCarousel banners={banners} />
      <Features />
    </div>
  );
}

import { Platform } from "./Platform";

export default interface Parent_Platforms {
  id: number;
  name: string;
  slug?: string;
  platforms: Platform[];
}

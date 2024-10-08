import { T_BaseEntity } from "./T_BaseEntity";

export interface Movie extends T_BaseEntity {
  title: string;
  genre_ids: number[];
}

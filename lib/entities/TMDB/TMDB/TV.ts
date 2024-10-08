import { T_BaseEntity } from "./T_BaseEntity";

export interface TV extends T_BaseEntity {
  name: string;
  genre_ids: number[];
}

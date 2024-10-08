/*
T_BaseEntity is not to be used as an interface in components or requests.

This entity exists to be extended so that more complex interfaces remain more easily readable and less bloated.

*/

export interface T_BaseEntity {
  id: number;
  poster_path?: string;
  genre_ids: number[];
  overview: string;
}

import { z } from "zod";
import { isValidMovie } from "../Movies/Movie";
import { isValidShow } from "../TV/Show";

export interface TMDB_Response<T> {
  page?: number;
  results?: T[];
  total_pages?: number;
  total_results?: number;
}

export const isValidPagesResponse = z.object({
  page: z.number().int().optional().default(1),
  results: z.array(isValidMovie.or(isValidShow)).optional(),
  total_pages: z.number().int().optional().default(0),
  total_results: z.number().int().optional().default(0),
});

export type T_Pages_Response = z.infer<typeof isValidPagesResponse>;

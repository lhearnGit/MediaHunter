import { z } from "zod";

const isValidReview_Author = z.object({
  name: z.string(),
  username: z.string(),
  avatar_path: z.string().nullable(),
  rating: z.number().nullable(),
});

export type ReviewAuthor = z.infer<typeof isValidReview_Author>;

export const isValidReview = z.object({
  id: z.string(), //one of the few ids that are strings in TMDB
  author: z.string(),
  author_details: isValidReview_Author,
  created_at: z.string(),
  content: z.string(),
});

export type Review = z.infer<typeof isValidReview>;

export const isValidReviewResponse = z.object({
  id: z.number().int("must be a number").default(0),
  page: z.number().int("must be a number").default(0),
  results: z.array(isValidReview),
  total_pages: z.number().int("must be a number").default(0),
  total_results: z.number().int("must be a number").default(0),
});

export type ReviewResponse = z.infer<typeof isValidReviewResponse>;

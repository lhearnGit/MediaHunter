import { z } from "zod";

export const isValidScreenShot = z.object({
  id: z.number(),
  url: z.string(),
});

export const isValidVideo = z.object({
  id: z.number(),
  name: z.string(),
  video_id: z.string(),
});
export type Video = z.infer<typeof isValidVideo>;
export type ScreenShot = z.infer<typeof isValidScreenShot>;

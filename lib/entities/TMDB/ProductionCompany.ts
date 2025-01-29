import { z } from "zod";

export const isValidProductionCompany = z.object({
  id: z.number().int("not an integer").default(0),
  logo_path: z.string().nullable().optional(),
  name: z.string(),
});

export type Production_Company = z.infer<typeof isValidProductionCompany>;

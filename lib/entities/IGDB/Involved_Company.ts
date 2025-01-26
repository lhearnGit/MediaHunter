import { z } from "zod";

export const isValidInvolvedCompany = z.object({
  id: z.number().int("Must be a whole number").gt(0, "cannot be negative"),
  company: z.object({
    id: z.number().int("Must be a whole number").gt(0, "cannot be negative"),
    name: z.string(),
    logo: z.object({ url: z.string() }).optional(),
  }),
  publisher: z.boolean(),
  developer: z.boolean(),
});

export type Involved_Company = z.infer<typeof isValidInvolvedCompany>;

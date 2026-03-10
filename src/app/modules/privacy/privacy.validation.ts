import { z } from "zod";

const create = z.object({
  type: z.enum(["privacy", "terms", "about", "faq"]),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export const privacy_validations = { create };

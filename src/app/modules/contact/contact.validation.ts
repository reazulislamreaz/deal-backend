import { z } from "zod";

const create = z.object({
  phone_number: z.string(),
  open_time: z.string(),
  close_time: z.string(),
  available_days: z.string(),
});

export const contact_validations = { create };

import { z } from "zod";

const create = z.object({
  email: z.string().email(),
  machine_id: z.string(),
  investment_amount: z.number(),
  investment_proof: z.string().url(),
});

const update = z.object({
  investment_amount: z.number().optional(),
  investment_proof: z.string().url().optional(),
});

export const investor_validations = {
  create,
  update,
};

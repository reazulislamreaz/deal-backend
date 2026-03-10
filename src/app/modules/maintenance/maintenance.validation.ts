import { z } from "zod";

const create = z.object({
  machine_id: z.string(),
  description: z.string(),
  photo: z.string(),
  cost: z.number().positive(),
});

const update = z.object({
  description: z.string().optional(),
  photo: z.string(),
  cost: z.number().positive().optional(),
});

export const maintenance_validations = {
  create,
  update,
};

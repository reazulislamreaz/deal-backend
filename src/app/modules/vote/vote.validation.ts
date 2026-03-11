import { z } from "zod";

const create = z.object({
  maintenance_id: z.string(),
  vote: z.enum(["APPROVE", "DECLINE"]),
});

export const vote_validations = { create };
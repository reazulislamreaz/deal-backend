import { z } from "zod";
import { MachineStatus } from "./machine.interface";

export const createMachineValidation = z.object({
  name: z.string(),
  type: z.string(),
  location: z.string(),
  cost: z.number(),
  photo: z.string().url(),
  status: z.nativeEnum(MachineStatus).optional(),
});

export const updateMachineValidation = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  cost: z.number().optional(),
  photo: z.string().url().optional(),
  status: z.nativeEnum(MachineStatus).optional(),
});

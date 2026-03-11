import { z } from "zod";

export const createMachineRevenueValidation = z.object({
    machineId: z.string(),
    month: z.string(),
    revenue: z.number(),
    expenses: z.number(),
    maintenanceCost: z.number(),
});
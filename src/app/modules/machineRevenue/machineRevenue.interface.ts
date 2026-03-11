import { Types } from "mongoose";

export interface IMachineRevenue {
  machineId: Types.ObjectId;
  month: string;

  revenue: number;
  expenses: number;
  maintenanceCost: number;
  profit: number;
}
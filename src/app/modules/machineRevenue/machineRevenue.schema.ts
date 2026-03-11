import { Schema, model } from "mongoose";
import { IMachineRevenue } from "./machineRevenue.interface";

const machineRevenueSchema = new Schema<IMachineRevenue>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: "machine",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    expenses: {
      type: Number,
      default: 0,
    },

    maintenanceCost: {
      type: Number,
      default: 0,
    },

    profit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
machineRevenueSchema.index({ machineId: 1, month: 1 }, { unique: true });

export const MachineRevenue_Model = model<IMachineRevenue>(
  "machineRevenue",
  machineRevenueSchema,
);

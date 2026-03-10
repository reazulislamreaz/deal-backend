import { Schema, model } from "mongoose";
import { IMachine, MachineStatus } from "./machine.interface";

const machineSchema = new Schema<IMachine>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(MachineStatus),
      default: MachineStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const Machine_Model = model<IMachine>("Machine", machineSchema);
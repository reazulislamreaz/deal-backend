import { Schema, model } from "mongoose";
import { T_Maintenance } from "./maintenance.interface";
import { required } from "zod/v4/core/util.cjs";

const maintenance_schema = new Schema<T_Maintenance>(
  {
    machine_id: {
      type: Schema.Types.ObjectId,
      ref: "machine",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    cost: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    performed_at: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "DELETED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export const maintenance_model = model("maintenance", maintenance_schema);

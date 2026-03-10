import { Schema, model } from "mongoose";
import { T_Investor } from "./investor.interface";

const investor_schema = new Schema<T_Investor>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    machine_id: {
      type: Schema.Types.ObjectId,
      ref: "machine",
      required: true,
    },
    investment_amount: {
      type: Number,
      required: true,
    },
    ownership_percent: {
      type: Number,
      required: true,
    },
    investment_proof: {
      type: String,
      required: true,
    },
    investment_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const investor_model = model<T_Investor>("investment", investor_schema);

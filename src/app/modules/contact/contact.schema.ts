import { Schema, model } from "mongoose";
import { T_Contact } from "./contact.interface";

const contact_schema = new Schema<T_Contact>(
  {
    phone_number: {
      type: String,
      required: true,
      trim: true,
    },
    open_time: {
      type: String,
      required: true,
    },
    close_time: {
      type: String,
      required: true,
    },
    available_days: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

export const contact_model = model<T_Contact>("contact", contact_schema);
import { Schema, model } from "mongoose";
import { T_Privacy } from "./privacy.interface";

const privacy_schema = new Schema<T_Privacy>(
  {
    type: {
      type: String,
      required: true,
      enum: ["privacy", "terms", "about"],
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const privacy_model = model<T_Privacy>("privacy", privacy_schema);

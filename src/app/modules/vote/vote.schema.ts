import { Schema, model } from "mongoose";
import { T_Vote } from "./vote.interface";

const vote_schema = new Schema<T_Vote>(
  {
    maintenance_id: {
      type: Schema.Types.ObjectId,
      ref: "maintenance",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    vote: {
      type: String,
      enum: ["APPROVE", "DECLINE"],
      required: true,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

vote_schema.index({ maintenance_id: 1, user_id: 1 }, { unique: true });

export const vote_model = model("vote", vote_schema);

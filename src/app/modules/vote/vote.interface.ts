import { Types } from "mongoose";

export type TVoteType = "APPROVE" | "DECLINE";

export type T_Vote = {
  maintenance_id: Types.ObjectId;
  user_id: Types.ObjectId;
  vote: TVoteType;
  created_at: Date;
};
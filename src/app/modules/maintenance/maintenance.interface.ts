import { Types } from "mongoose";

export type T_Maintenance = {
  machine_id: Types.ObjectId;
  description: string;
  cost: number;
  photo: string;
  performed_at: Date;
  status: "ACTIVE" | "DELETED";
};

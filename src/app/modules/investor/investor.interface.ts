import { Types } from "mongoose";

export type T_Investor = {
  user_id: Types.ObjectId;
  machine_id: Types.ObjectId;
  investment_amount: number;
  ownership_percent: number;
  investment_proof: string;
  investment_date: Date;
};
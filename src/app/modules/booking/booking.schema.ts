import { Schema, model } from "mongoose";
import { T_Booking } from "./booking.interface";

const booking_schema = new Schema<T_Booking>({});

export const booking_model = model("booking", booking_schema);

import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { booking_controller } from "./booking.controller";
import { booking_validations } from "./booking.validation";

const booking_router = Router();

booking_router.post(
  "/create",
  RequestValidator(booking_validations.create),
  booking_controller.create_new_booking
);

export default booking_router;

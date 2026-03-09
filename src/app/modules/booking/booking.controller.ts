import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { booking_service } from "./booking.service";

const create_new_booking = catchAsync(async (req, res) => {
  const result = await booking_service.create_new_booking_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New booking created successfully!",
    data: result,
  });
});

export const booking_controller = { create_new_booking };

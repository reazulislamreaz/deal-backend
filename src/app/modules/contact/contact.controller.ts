import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { contact_service } from "./contact.service";

const create_or_update_contact = catchAsync(async (req, res) => {
  const result = await contact_service.create_or_update_contact_into_db(
    req.body
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact information saved successfully!",
    data: result,
  });
});

const get_contact = catchAsync(async (req, res) => {
  const result = await contact_service.get_contact_from_db();

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact fetched successfully!",
    data: result,
  });
});

export const contact_controller = {
  create_or_update_contact,
  get_contact,
};
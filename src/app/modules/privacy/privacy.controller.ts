import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { privacy_service } from "./privacy.service";

const create_new_privacy = catchAsync(async (req, res) => {
  const result = await privacy_service.create_new_privacy_into_db(req.body);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Privacy content saved successfully!",
    data: result,
  });
});

const get_privacy = catchAsync(async (req, res) => {
  const { type } = req.query;

  const result = await privacy_service.get_privacy_from_db(type as string);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Privacy content fetched successfully!",
    data: result,
  });
});

export const privacy_controller = {
  create_new_privacy,
  get_privacy,
};

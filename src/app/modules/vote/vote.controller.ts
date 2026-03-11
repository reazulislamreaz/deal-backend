import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { vote_service } from "./vote.service";

const create_new_vote = catchAsync(async (req, res) => {
  const result = await vote_service.create_new_vote_into_db(req);

  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Vote submitted successfully",
    data: result,
  });
});

const get_vote_result = catchAsync(async (req, res) => {
  const { maintenanceId } = req.params;

  const result = await vote_service.get_vote_result(maintenanceId as string);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote results retrieved",
    data: result,
  });
});

export const vote_controller = {
  create_new_vote,
  get_vote_result,
};

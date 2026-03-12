import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { investor_service } from "./investor.service";

const create_new_investor = catchAsync(async (req, res) => {
  const result = await investor_service.create_new_investor_into_db(req);

  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Investor created successfully!",
    data: result,
  });
});

const get_all_investors = catchAsync(async (req, res) => {
  const result = await investor_service.get_all_investors_from_db(req.query);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Investors retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const get_single_investor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await investor_service.get_single_investor_from_db(
    id as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Investor details retrieved",
    data: result,
  });
});

const suspend_investor = catchAsync(async (req, res) => {
  const { accountId } = req.params;

  const result = await investor_service.suspend_investor_from_db(
    accountId as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Investor suspended successfully",
    data: result,
  });
});
const update_investor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await investor_service.update_investor_into_db(
    id as string,
    req.body,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Investor updated successfully",
    data: result,
  });
});

const getInvestorDashboard = catchAsync(async (req, res) => {
  const userMail = req.user?.email;


  const result = await investor_service.getInvestorDashboardFromDB(
    userMail as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Investor dashboard retrieved successfully",
    data: result,
  });
});
export const investor_controller = {
  create_new_investor,
  get_all_investors,
  get_single_investor,
  suspend_investor,
  update_investor,
  getInvestorDashboard,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { MachineRevenue_Service } from "./machineRevenue.service";

const createMachineRevenue = catchAsync(async (req, res) => {
  const result = await MachineRevenue_Service.createMachineRevenueIntoDB(
    req.body,
  );

  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Machine revenue created successfully",
    data: result,
  });
});

const getMachineRevenueByMonth = catchAsync(async (req, res) => {
  const { machineId } = req.params;
  const { month } = req.query;

  const result = await MachineRevenue_Service.getMachineRevenueByMonthFromDB(
    machineId as string,
    month as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Machine revenue retrieved successfully",
    data: result,
  });
});

export const MachineRevenue_Controller = {
  createMachineRevenue,
  getMachineRevenueByMonth,
};

import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { maintenance_service } from "./maintenance.service";

const create_maintenance = catchAsync(async (req, res) => {
  const result = await maintenance_service.create_maintenance_into_db(req.body);

  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Maintenance created successfully",
    data: result,
  });
});

const get_all_maintenances = catchAsync(async (req, res) => {
  const result = await maintenance_service.get_all_maintenances_from_db(
    req.query,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenances retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const get_single_maintenance = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await maintenance_service.get_single_maintenance_from_db(
    id as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenance details retrieved",
    data: result,
  });
});

const update_maintenance = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await maintenance_service.update_maintenance_into_db(
    id as string,
    req.body,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenance updated successfully",
    data: result,
  });
});

const delete_maintenance = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await maintenance_service.delete_maintenance_from_db(
    id as string,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenance deleted successfully",
    data: result,
  });
});

export const maintenance_controller = {
  create_maintenance,
  get_all_maintenances,
  get_single_maintenance,
  update_maintenance,
  delete_maintenance,
};

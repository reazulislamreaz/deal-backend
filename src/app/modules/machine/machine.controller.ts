import httpStatus from "http-status";

import manageResponse from "../../utils/manage_response";
import { Machine_Service } from "./machine.service";
import catchAsync from "../../utils/catch_async";

const createMachine = catchAsync(async (req, res) => {
  const result = await Machine_Service.createMachineIntoDB(req.body);

  manageResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Machine created successfully",
    data: result,
  });
});

const getAllMachines = catchAsync(async (req, res) => {
  const result = await Machine_Service.getAllMachinesFromDB(req.query);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Machines retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleMachine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Machine_Service.getSingleMachineFromDB(id as any);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Machine retrieved successfully",
    data: result,
  });
});

const updateMachine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Machine_Service.updateMachineIntoDB(id as any, req.body);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Machine updated successfully",
    data: result,
  });
});

const deleteMachine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Machine_Service.deleteMachineFromDB(id as any);

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Machine deleted successfully",
    data: result,
  });
});
const getMyMachines = catchAsync(async (req, res) => {
  const userId = req.user?.email;

  if (!userId) {
    console.log("sorry");
  }

  const result = await Machine_Service.getMyMachinesFromDB(
    userId as any,
    req.query,
  );

  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My machines retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const Machine_Controller = {
  createMachine,
  getAllMachines,
  getSingleMachine,
  updateMachine,
  deleteMachine,
  getMyMachines,
};

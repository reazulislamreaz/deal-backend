import express from "express";
import { MachineRevenue_Controller } from "./machineRevenue.controller";
import RequestValidator from "../../middlewares/request_validator";
import { createMachineRevenueValidation } from "./machineRevenue.validation";

const router = express.Router();

router.post(
  "/",
  RequestValidator(createMachineRevenueValidation),
  MachineRevenue_Controller.createMachineRevenue,
);

router.get("/:machineId", MachineRevenue_Controller.getMachineRevenueByMonth);


export default router;

import express from "express";

import { Machine_Controller } from "./machine.controller";
import {
  createMachineValidation,
  updateMachineValidation,
} from "./machine.validation";
import RequestValidator from "../../middlewares/request_validator";

const router = express.Router();

router.post(
  "/create",
  RequestValidator(createMachineValidation),
  Machine_Controller.createMachine,
);

router.get("/", Machine_Controller.getAllMachines);

router.get("/:id", Machine_Controller.getSingleMachine);

router.patch(
  "/:id",
  RequestValidator(updateMachineValidation),
  Machine_Controller.updateMachine,
);

router.delete("/:id", Machine_Controller.deleteMachine);

export default router;

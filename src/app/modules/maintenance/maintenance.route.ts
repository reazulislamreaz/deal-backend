import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { maintenance_controller } from "./maintenance.controller";
import { maintenance_validations } from "./maintenance.validation";

const maintenance_router = Router();

maintenance_router.post(
  "/create",
  RequestValidator(maintenance_validations.create),
  maintenance_controller.create_maintenance
);

maintenance_router.get(
  "/",
  maintenance_controller.get_all_maintenances
);

maintenance_router.get(
  "/:id",
  maintenance_controller.get_single_maintenance
);

maintenance_router.patch(
  "/update/:id",
  RequestValidator(maintenance_validations.update),
  maintenance_controller.update_maintenance
);

maintenance_router.delete(
  "/:id",
  maintenance_controller.delete_maintenance
);

export default maintenance_router;
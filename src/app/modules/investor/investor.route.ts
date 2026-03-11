import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { investor_controller } from "./investor.controller";
import { investor_validations } from "./investor.validation";

const investor_router = Router();

investor_router.post(
  "/create",
  RequestValidator(investor_validations.create),
  investor_controller.create_new_investor,
);

// dashboard
investor_router.get("/dashboard", investor_controller.getInvestorDashboard);

investor_router.get("/", investor_controller.get_all_investors);

investor_router.get("/:id", investor_controller.get_single_investor);

investor_router.patch(
  "/suspend/:accountId",
  investor_controller.suspend_investor,
);
investor_router.patch(
  "/update/:id",
  RequestValidator(investor_validations.update),
  investor_controller.update_investor,
);

export default investor_router;

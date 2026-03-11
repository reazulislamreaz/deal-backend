import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { vote_validations } from "./vote.validation";
import auth from "../../middlewares/auth";
import { vote_controller } from "./vote.controller";

const vote_router = Router();

vote_router.post(
  "/create",
  auth("INVESTOR"),
  RequestValidator(vote_validations.create),
  vote_controller.create_new_vote,
);

vote_router.get(
  "/result/:maintenanceId",
  auth("ADMIN"),
  vote_controller.get_vote_result,
);

export default vote_router;

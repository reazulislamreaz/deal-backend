import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { privacy_controller } from "./privacy.controller";
import { privacy_validations } from "./privacy.validation";

const privacy_router = Router();

privacy_router.post(
  "/create",
  RequestValidator(privacy_validations.create),
  privacy_controller.create_new_privacy
);

privacy_router.get("/", privacy_controller.get_privacy);

export default privacy_router;
import { user_controllers } from "./user.controller";
import { user_validations } from "./user.validation";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { Router } from "express";

const userRoute = Router();

userRoute.patch(
  "/update-profile",
  auth("ADMIN", "INVESTOR"),
  RequestValidator(user_validations.update_user),
  user_controllers.update_profile,
);

export default userRoute;

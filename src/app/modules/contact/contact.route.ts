import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { contact_controller } from "./contact.controller";
import { contact_validations } from "./contact.validation";

const contact_router = Router();

contact_router.post(
  "/save",
  RequestValidator(contact_validations.create),
  contact_controller.create_or_update_contact
);

contact_router.get("/", contact_controller.get_contact);

export default contact_router;
import { T_Contact } from "./contact.interface";
import { contact_model } from "./contact.schema";

const create_or_update_contact_into_db = async (payload: T_Contact) => {
  const existing = await contact_model.findOne();

  if (existing) {
    const updated = await contact_model.findByIdAndUpdate(
      existing._id,
      payload,
      { new: true },
    );
    return updated;
  }

  const result = await contact_model.create(payload);
  return result;
};

const get_contact_from_db = async () => {
  return await contact_model.findOne();
};

export const contact_service = {
  create_or_update_contact_into_db,
  get_contact_from_db,
};

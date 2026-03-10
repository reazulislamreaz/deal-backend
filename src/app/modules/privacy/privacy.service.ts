import { T_Privacy } from "./privacy.interface";
import { privacy_model } from "./privacy.schema";

const create_new_privacy_into_db = async (payload: T_Privacy) => {
  const result = await privacy_model.findOneAndUpdate(
    { type: payload.type },
    payload,
    { upsert: true, new: true },
  );

  return result;
};

const get_privacy_from_db = async (type: string) => {
  const result = await privacy_model.findOne({ type });
  return result;
};

export const privacy_service = {
  create_new_privacy_into_db,
  get_privacy_from_db,
};

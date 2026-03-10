import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { User_Model } from "./user.schema";
import { Account_Model } from "../auth/auth.schema";

const update_profile_into_db = async (req: Request) => {
  const isExistUser = await Account_Model.findOne({
    email: req?.user?.email,
  }).lean();
  const result = await User_Model.findOneAndUpdate(
    { accountId: isExistUser!._id },
    req?.body,
    {
      new: true,
    },
  );
  return result;
};

export const user_services = {
  update_profile_into_db,
};

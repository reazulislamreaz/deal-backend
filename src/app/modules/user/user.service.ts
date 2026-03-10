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
const get_all_users_from_db = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const users = await User_Model.find()
    .populate("accountId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await User_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: users,
  };
};

const get_single_user_from_db = async (id: string) => {
  const result = await User_Model.findById(id).populate("accountId");
  return result;
};

const suspend_user_from_db = async (id: string) => {
  const result = await Account_Model.findByIdAndUpdate(
    id,
    { accountStatus: "SUSPENDED" },
    { new: true },
  );

  return result;
};

export const user_services = {
  update_profile_into_db,
  get_all_users_from_db,
  get_single_user_from_db,
  suspend_user_from_db,
};

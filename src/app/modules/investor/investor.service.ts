import { Request } from "express";
import { investor_model } from "./investor.schema";
import { Account_Model } from "../auth/auth.schema";
import { User_Model } from "../user/user.schema";
import { Machine_Model } from "../machine/machine.schema";
import { Types } from "mongoose";
import { MachineRevenue_Model } from "../machineRevenue/machineRevenue.schema";

const create_new_investor_into_db = async (req: Request) => {
  const { email, machine_id, investment_amount, investment_proof } = req.body;

  const account = await Account_Model.findOne({
    email,
    accountStatus: "ACTIVE",
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const user = await User_Model.findOne({
    accountId: account._id,
  });

  if (!user) {
    throw new Error("User profile not found");
  }

  const machine = await Machine_Model.findById(machine_id);

  if (!machine) {
    throw new Error("Machine not found");
  }

  const machine_cost = machine.cost;

  if (!machine_cost || machine_cost <= 0) {
    throw new Error("Invalid machine cost");
  }

  // calculate ownership %
  const ownership_percent = Number(
    ((investment_amount / machine_cost) * 100).toFixed(4),
  );

  account.role = "INVESTOR";
  await account.save();

  const result = await investor_model.create({
    user_id: account._id,
    machine_id,
    investment_amount,
    ownership_percent,
    investment_proof,
  });

  return result;
};

const get_all_investors_from_db = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const investors = await investor_model
    .find()
    .populate({
      path: "user_id",
      populate: { path: "accountId", match: { accountStatus: "ACTIVE" } },
    })
    .populate("machine_id")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await investor_model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: investors,
  };
};

const get_single_investor_from_db = async (id: string) => {
  const result = await investor_model
    .findById(id)
    .populate("user_id")
    .populate("machine_id");

  return result;
};

const suspend_investor_from_db = async (accountId: string) => {
  const result = await Account_Model.findByIdAndUpdate(
    accountId,
    { accountStatus: "SUSPENDED" },
    { new: true },
  );

  return result;
};

const update_investor_into_db = async (id: string, payload: any) => {
  const result = await investor_model.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

//
const getInvestorDashboardFromDB = async (userMail: string) => {
  const user = await Account_Model.findOne({ email: userMail });

  const userId = user?._id;
  const investorObjectId = new Types.ObjectId(userId);
  const investments = await investor_model.find({
    user_id: userId,
  });
  console.log("this is all", investorObjectId);

  const machineIds = investments.map((inv) => inv.machine_id);

  const totalInvested = investments.reduce(
    (sum, inv) => sum + inv.investment_amount,
    0,
  );

  const activeMachines = await Machine_Model.countDocuments({
    _id: { $in: machineIds },
    status: "ACTIVE",
  });

  const revenueData = await MachineRevenue_Model.aggregate([
    {
      $match: {
        machineId: { $in: machineIds },
      },
    },
    {
      $group: {
        _id: null,
        totalProfit: { $sum: "$profit" },
        totalMaintenance: { $sum: "$maintenanceCost" },
      },
    },
  ]);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyRevenue = await MachineRevenue_Model.aggregate([
    {
      $match: {
        machineId: { $in: machineIds },
        month: currentMonth,
      },
    },
    {
      $group: {
        _id: null,
        profit: { $sum: "$profit" },
      },
    },
  ]);

  return {
    totalInvested,
    activeMachines,
    totalEarnings: revenueData[0]?.totalProfit || 0,
    thisMonthProfit: monthlyRevenue[0]?.profit || 0,
    maintenanceCost: revenueData[0]?.totalMaintenance || 0,
  };
};

export const investor_service = {
  create_new_investor_into_db,
  get_all_investors_from_db,
  get_single_investor_from_db,
  suspend_investor_from_db,
  update_investor_into_db,
  getInvestorDashboardFromDB,
};

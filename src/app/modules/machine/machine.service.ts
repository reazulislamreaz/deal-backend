import { Types } from "mongoose";
import { investor_model } from "../investor/investor.schema";
import { IMachine } from "./machine.interface";
import { Machine_Model } from "./machine.schema";

const createMachineIntoDB = async (payload: IMachine) => {
  const machine = await Machine_Model.create(payload);
  return machine;
};

const getAllMachinesFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const machines = await Machine_Model.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Machine_Model.countDocuments();

  const machineIds = machines.map((m) => m._id);

  const investmentStats = await investor_model.aggregate([
    {
      $match: {
        machine_id: { $in: machineIds },
      },
    },
    {
      $group: {
        _id: "$machine_id",
        totalInvested: { $sum: "$investment_amount" },
      },
    },
  ]);
  console.log(investmentStats);
  const investmentMap = new Map(
    investmentStats.map((item) => [item._id.toString(), item.totalInvested]),
  );

  const machinesWithOwnership = machines.map((machine) => {
    const totalInvested = investmentMap.get(machine._id.toString()) || 0;

    const ownershipSoldPercent =
      machine.cost > 0
        ? Number(((totalInvested / machine.cost) * 100).toFixed(2))
        : 0;

    return {
      ...machine,
      totalInvested,
      ownershipSoldPercent,
    };
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: machinesWithOwnership,
  };
};

const getSingleMachineFromDB = async (id: string) => {
  const machine = await Machine_Model.findById(id).lean();

  if (!machine) return null;

  const investmentStats = await investor_model.aggregate([
    {
      $match: {
        machine_id: new Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: null,
        totalInvested: { $sum: "$investment_amount" },
      },
    },
  ]);

  const totalInvested = investmentStats[0]?.totalInvested || 0;

  const ownershipSoldPercent =
    machine.cost > 0
      ? Number(((totalInvested / machine.cost) * 100).toFixed(2))
      : 0;

  return {
    ...machine,
    totalInvested,
    ownershipSoldPercent,
  };
};
const updateMachineIntoDB = async (id: string, payload: Partial<IMachine>) => {
  return Machine_Model.findByIdAndUpdate(id, payload, { new: true });
};

const deleteMachineFromDB = async (id: string) => {
  return Machine_Model.findByIdAndDelete(id);
};

export const Machine_Service = {
  createMachineIntoDB,
  getAllMachinesFromDB,
  getSingleMachineFromDB,
  updateMachineIntoDB,
  deleteMachineFromDB,
};

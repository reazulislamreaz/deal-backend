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
    .limit(limit);

  const total = await Machine_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: machines,
  };
};

const getSingleMachineFromDB = async (id: string) => {
  return Machine_Model.findById(id);
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

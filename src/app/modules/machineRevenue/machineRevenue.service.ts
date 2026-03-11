import { IMachineRevenue } from "./machineRevenue.interface";
import { MachineRevenue_Model } from "./machineRevenue.schema";

const createMachineRevenueIntoDB = async (payload: IMachineRevenue) => {
  const profit = payload.revenue - payload.expenses;

  const data = {
    ...payload,
    profit,
  };

  const revenue = await MachineRevenue_Model.create(data);

  return revenue;
};

const getMachineRevenueByMonthFromDB = async (
  machineId: string,
  month: string,
) => {
  const revenue = await MachineRevenue_Model.findOne({
    machineId,
    month,
  });

  return revenue;
};

export const MachineRevenue_Service = {
  createMachineRevenueIntoDB,
  getMachineRevenueByMonthFromDB,
};
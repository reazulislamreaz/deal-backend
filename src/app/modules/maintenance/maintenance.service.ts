import { maintenance_model } from "./maintenance.schema";

const create_maintenance_into_db = async (payload: any) => {
  const result = await maintenance_model.create(payload);

  return result;
};

const get_all_maintenances_from_db = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await maintenance_model
    .find({ status: "ACTIVE" })
    .populate("machine_id")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await maintenance_model.countDocuments({
    status: "ACTIVE",
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data,
  };
};

const get_single_maintenance_from_db = async (id: string) => {
  const result = await maintenance_model.findById(id).populate("machine_id");

  return result;
};

const update_maintenance_into_db = async (id: string, payload: any) => {
  const result = await maintenance_model.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const delete_maintenance_from_db = async (id: string) => {
  const result = await maintenance_model.findByIdAndUpdate(
    id,
    { status: "DELETED" },
    { new: true },
  );

  return result;
};

export const maintenance_service = {
  create_maintenance_into_db,
  get_all_maintenances_from_db,
  get_single_maintenance_from_db,
  update_maintenance_into_db,
  delete_maintenance_from_db,
};

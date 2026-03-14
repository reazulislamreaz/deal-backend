import { vote_model } from "../vote/vote.schema";
import { maintenance_model } from "./maintenance.schema";

const create_maintenance_into_db = async (payload: any) => {
  const result = await maintenance_model.create(payload);

  return result;
};

const get_all_maintenances_from_db = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const maintenances = await maintenance_model
    .find({ status: "ACTIVE" })
    .populate("machine_id")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await maintenance_model.countDocuments({
    status: "ACTIVE",
  });

  const maintenanceIds = maintenances.map((m) => m._id);

  const voteStats = await vote_model.aggregate([
    {
      $match: {
        maintenance_id: { $in: maintenanceIds },
      },
    },
    {
      $group: {
        _id: "$maintenance_id",
        approve: {
          $sum: {
            $cond: [{ $eq: ["$vote", "APPROVE"] }, 1, 0],
          },
        },
        reject: {
          $sum: {
            $cond: [{ $eq: ["$vote", "REJECT"] }, 1, 0],
          },
        },
        totalVotes: { $sum: 1 },
      },
    },
  ]);

  const voteMap = new Map(voteStats.map((v: any) => [v._id.toString(), v]));

  const data = maintenances.map((maintenance) => {
    const stats = voteMap.get(maintenance._id.toString());

    const approve = stats?.approve || 0;
    const reject = stats?.reject || 0;
    const totalVotes = stats?.totalVotes || 0;

    const approvePercent =
      totalVotes > 0 ? Number(((approve / totalVotes) * 100).toFixed(2)) : 0;

    const rejectPercent =
      totalVotes > 0 ? Number(((reject / totalVotes) * 100).toFixed(2)) : 0;

    return {
      ...maintenance,
      votingResult: {
        approvePercent,
        rejectPercent,
        totalVotes,
      },
    };
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
// const get_all_maintenances_from_db = async (query: any) => {
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const data = await maintenance_model
//     .find({ status: "ACTIVE" })
//     .populate("machine_id")
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   const total = await maintenance_model.countDocuments({
//     status: "ACTIVE",
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage: Math.ceil(total / limit),
//     },
//     data,
//   };
// };

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

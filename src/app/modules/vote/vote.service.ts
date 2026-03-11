import { Request } from "express";
import { vote_model } from "./vote.schema";
import { maintenance_model } from "../maintenance/maintenance.schema";
import { investor_model } from "../investor/investor.schema";

const create_new_vote_into_db = async (req: Request) => {
  const { maintenance_id, vote } = req.body;
  const userId = req.user?.userId;

  const maintenance = await maintenance_model.findById(maintenance_id);

  if (!maintenance) {
    throw new Error("Maintenance not found");
  }

  const investment = await investor_model.findOne({
    machine_id: maintenance.machine_id,
    user_id: userId,
  });

  if (!investment) {
    throw new Error("You are not an investor of this machine");
  }

  const existingVote = await vote_model.findOne({
    maintenance_id,
    user_id: userId,
  });

  if (existingVote) {
    throw new Error("You already voted");
  }

  const newVote = await vote_model.create({
    maintenance_id,
    user_id: userId,
    vote,
  });

  await calculate_vote_result(maintenance_id);

  return newVote;
};

const calculate_vote_result = async (maintenance_id: string) => {
  const votes = await vote_model.find({ maintenance_id });

  const maintenance = await maintenance_model.findById(maintenance_id);

  const investments = await investor_model.find({
    machine_id: maintenance?.machine_id,
  });

  let approveWeight = 0;
  let declineWeight = 0;

  for (const v of votes) {
    const investor = investments.find(
      (i) => i.user_id.toString() === v.user_id.toString(),
    );

    if (!investor) continue;

    const weight = investor.ownership_percent;

    if (v.vote === "APPROVE") approveWeight += weight;
    else declineWeight += weight;
  }

  if (approveWeight > 50) {
    await maintenance_model.findByIdAndUpdate(maintenance_id, {
      status: "APPROVED",
    });
  }

  return {
    approveWeight,
    declineWeight,
  };
};

const get_vote_result = async (maintenanceId: string) => {
  const votes = await vote_model.find({ maintenance_id: maintenanceId });

  const approve = votes.filter((v) => v.vote === "APPROVE").length;
  const decline = votes.filter((v) => v.vote === "DECLINE").length;

  const total = approve + decline;

  return {
    approvePercentage: total ? (approve / total) * 100 : 0,
    declinePercentage: total ? (decline / total) * 100 : 0,
    totalVotes: total,
  };
};

export const vote_service = {
  create_new_vote_into_db,
  get_vote_result,
};

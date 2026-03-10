export enum MachineStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  MAINTENANCE = "MAINTENANCE",
}

export interface IMachine {
  name: string;
  type: string;
  location: string;
  cost: number;
  photo: string;
  status: MachineStatus;
}
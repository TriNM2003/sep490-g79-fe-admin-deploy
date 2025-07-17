import type { User } from "./User";

export interface DonationTableData {
  _id: string; 
  donor?: User;
  amount: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

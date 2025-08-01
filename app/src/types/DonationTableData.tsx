import type { Donor } from "./User";

export interface DonationTableData {
  _id: string; 
  donor?: Donor | null;
  amount: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

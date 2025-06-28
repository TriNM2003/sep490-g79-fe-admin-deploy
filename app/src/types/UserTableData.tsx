export interface UserTableData {
    index: number;
    _id: string;
  avatar: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  warningCount: number;
  roles: [string];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
  
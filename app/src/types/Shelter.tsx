export interface Shelter {
  _id?: string;
  name: string;
  shelterCode: string;
  bio?: string;
  email: string;
  hotline: number;
  avatar?: string;
  background?: string;
  address?: string;
  membersCount: number;
  invitationsCount: number;
  shelterLicenseURL: string;
  foundationDate: Date;
  status: string;
  warningCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

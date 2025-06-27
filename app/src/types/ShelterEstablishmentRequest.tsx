export interface ShelterEstablishmentRequestTableData {
    _id: string;
    avatar: string;
    shelterCode: string;
    status: string;
    name: string;
    email: string;
    hotline: number;
    address: string;
    shelterLicenseURL: string;
    createdBy: {
        fullName: string;
        avatar: string
    }
    createdAt: Date;
    updatedAt: Date;
}
  
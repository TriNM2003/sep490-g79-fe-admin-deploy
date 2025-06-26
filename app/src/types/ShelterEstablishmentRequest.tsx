export interface ShelterEstablishmentRequestTableData {
    index: number;
    _id: string;
    avatar: string;
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
    updateAt: Date;
}
  
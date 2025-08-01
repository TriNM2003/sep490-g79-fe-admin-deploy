export interface User {
    id: string;
    userId: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    avatar: string;
    isActive?: boolean;
    phoneNumber?: string;
    createdAt?: string;
    //.........
  }
  

  export interface Donor {
    _id: string;
    avatar?: string;
    fullName: string
  }
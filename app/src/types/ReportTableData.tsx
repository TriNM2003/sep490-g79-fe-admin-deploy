export interface ReportUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  phoneNumber?: string;
  dob?: string;
  bio?: string;
  address?: string;
  background?: string;
  location?: {
    lat: number;
    lng: number;
  };
  warningCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---------- Post ----------
export interface ReportPost {
  _id: string;
  title: string;
  photos: string[];
  privacy: string[];
  createdBy: ReportUser;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---------- Blog ----------
export interface ReportBlog {
  _id: string;
  title: string;
  description?: string;
  content: string;
  thumbnail_url: string;
  status: string;
  shelter: {
    _id: string;
    name: string;
    avatar?: string;
    address?: string;
    warningCount?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface ReportTableData {
  _id: string;
  reportType: string;
  user?: ReportUser;   // nếu báo cáo người dùng
  post?: ReportPost;   // nếu báo cáo bài viết
  blog?:ReportBlog;   // nếu báo cáo blog
  reportedBy: ReportUser;
  reviewedBy?: ReportUser;
  reason: string;
  photos?: string[];
  status: string;
  createdAt: Date; 
  updatedAt: Date;
}

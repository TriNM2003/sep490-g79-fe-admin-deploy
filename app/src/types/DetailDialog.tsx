
import type { ReportBlog, ReportPost, ReportUser } from "./ReportTableData";

export interface DetailDialog<T>{
  isOpen: boolean;
  detail: T;
};

interface UserReportDetail {
  _id: string;
  reportType: string;
  user?: ReportUser;
  reportedBy: ReportUser;
  reviewedBy?: ReportUser;
  reason: string;
  photos?: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostReportDetail {
  _id: string;
  reportType: string;
  post?: ReportPost;
  reportedBy: ReportUser;
  reviewedBy?: ReportUser;
  reason: string;
  photos?: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogReportDetail {
  _id: string;
  reportType: string;
  blog?: ReportBlog;
  reportedBy: ReportUser;
  reviewedBy?: ReportUser;
  reason: string;
  photos?: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserReportDetailDialog = DetailDialog<UserReportDetail>;
export type PostReportDetailDialog = DetailDialog<PostReportDetail>;
export type BlogReportDetailDialog = DetailDialog<BlogReportDetail>;
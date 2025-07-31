import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from '@/pages/Admin/AdminDashboard';
import DonationManagement from '@/pages/Admin/DonationManagement';
import ReportManagement from '@/pages/Admin/ReportManagement';
import ShelterManagement from '@/pages/Admin/ShelterManagement';
import UserManagement from '@/pages/Admin/UserManagement';
import Login from '@/pages/Common/Login';
import Layout from "@/components/layouts/layout";
import UserReportManagement from "@/components/report-management/report-user/UserReportManagement";
import PostReportManagement from "@/components/report-management/report-post/PostReportManagement";
import BreedManagement from "@/pages/Admin/BreedManagement";
import SpeciesManagement from "@/pages/Admin/SpeciesManagement";
import BlogReportManagemnt from "@/components/report-management/report-blog/BlogReportManagement";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route index element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<UserManagement />} />
          {/* <Route path="blog" element={<BlogManagement />} /> */}
          <Route path="donation" element={<DonationManagement />} />
          <Route path="breed" element={<BreedManagement />} />
          <Route path="species" element={<SpeciesManagement />} />

          <Route path="report" element={<ReportManagement />}>
            <Route index element={<UserReportManagement />} />
            <Route path="user" element={<UserReportManagement />} />
            <Route path="post" element={<PostReportManagement />} />
            <Route path="blog" element={<BlogReportManagemnt />} />
          </Route>
          
          <Route path="shelter" element={<ShelterManagement />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
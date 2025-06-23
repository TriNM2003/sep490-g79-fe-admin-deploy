import { Navigate, Outlet, Route } from 'react-router-dom'

function PublicRoutes() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return <Navigate to="/admin/dashboard" replace={true} />;
  }
  return <Outlet />;
}

export default PublicRoutes


import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return <Navigate to="/login" replace={true} />;
    }
    return <Outlet />
}

export default PrivateRoutes

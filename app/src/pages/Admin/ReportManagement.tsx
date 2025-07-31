import { Outlet } from "react-router-dom";

const ReportManagement = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
        <Outlet />
    </div>
  );
}

export default ReportManagement
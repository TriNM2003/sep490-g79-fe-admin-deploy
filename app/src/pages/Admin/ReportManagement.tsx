import { Badge } from "@/components/ui/badge";
import { Outlet } from "react-router-dom";

const ReportManagement = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="col-span-12 flex flex-col gap-2 px-5 pt-10">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Quản lý báo cáo
          </h4>
          <Badge className="mx-auto p-2">Tổng số báo cáo chờ xử lý: 12</Badge>
        </div>
      <Outlet />
    </div>
  );
}

export default ReportManagement
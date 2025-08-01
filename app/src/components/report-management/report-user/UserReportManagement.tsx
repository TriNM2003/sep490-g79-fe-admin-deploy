
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllUserReports from './AllUserReports';
import PendingUserReports from './PendingUserReports';


const UserReportManagement = () => {
      
  return (
    <div className="flex flex-1 flex-col  py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <Tabs defaultValue="pending">
          <TabsList className="w-[400px]">
            <TabsTrigger value="pending" className="cursor-pointer">
              Các báo cáo tài khoản chờ xử lý
            </TabsTrigger>
            <TabsTrigger value="all" className="cursor-pointer">
              Lịch sử báo cáo tài khoản
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <PendingUserReports />
          </TabsContent>
          <TabsContent value="all">
            <AllUserReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserReportManagement;
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PendingBlogReports from './PendingBlogReports';
import AllBlogReports from './AllBlogReports';


const BlogReportManagement = () => {
  return (
      <div className="flex flex-1 flex-col  py-10">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending" className="cursor-pointer">
                Các báo cáo bài viết blog chờ xử lý
              </TabsTrigger>
              <TabsTrigger value="all" className="cursor-pointer">
                Lịch sử báo cáo bài viết blog
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <PendingBlogReports />
            </TabsContent>
            <TabsContent value="all">
              <AllBlogReports />
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

export default BlogReportManagement;
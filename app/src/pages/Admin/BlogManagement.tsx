import AllBlogs from '@/components/blog-management/tabs/AllBlogs';
import ModeratingBlogs from '@/components/blog-management/tabs/ModeratingBlogs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const BlogManagement = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main mt-10">
        <Tabs defaultValue="allblogs">
            <TabsList className="w-[400px]">
              <TabsTrigger value="allblogs" className='cursor-pointer'>Tất cả blog</TabsTrigger>
              <TabsTrigger value="moderatingblogs" className='cursor-pointer'>
                Các blog chờ duyệt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="allblogs">
              <AllBlogs />
            </TabsContent>
            <TabsContent value="moderatingblogs">
              <ModeratingBlogs />
            </TabsContent>
          </Tabs>
      </div>
    </div>
  );
}

export default BlogManagement;
import BlogTable from '@/components/blog-management/BlogTable';
import AllBlogs from '@/components/blog-management/tabs/AllBlogs';
import ModeratingBlogs from '@/components/blog-management/tabs/ModeratingBlogs';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppContext from '@/context/AppContext';
import { type Blog } from '@/types/Blog';
import useAuthAxios from '@/utils/authAxios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';


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
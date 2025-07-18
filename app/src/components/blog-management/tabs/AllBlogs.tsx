import BlogTable from '@/components/blog-management/BlogTable';
import { Input } from '@/components/ui/input';
import AppContext from '@/context/AppContext';
import { type Blog } from '@/types/Blog';
import useAuthAxios from '@/utils/authAxios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';


const AllBlogs = () => {
      const authAxios = useAuthAxios();
      const {blogAPI} = useContext(AppContext);
      const [blogs, setBlogs] = useState<Blog[]>([]);
      const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
      const [refresh, setRefresh] = useState<boolean>(false); 
      const [search, setSearch] = useState<string>("");

      useEffect(() => {
        authAxios.get(`${blogAPI}/get-all`)
        .then(({data}) => {
          setBlogs(data);
          setFilteredBlogs(data);
        }) 
        .catch((err) => console.log(err?.response.data.message))
      }, [refresh])

      useEffect(() => {
        if (search.trim().length === 0) {
          setFilteredBlogs(blogs);
          return;
        }
        const searchedBlogs = blogs.filter((blog) => {
          if (
            (blog.shelter.name &&
              blog.shelter.name.toLowerCase().includes(search.toLowerCase())) ||
            (blog.title &&
              blog.title.toLowerCase().includes(search.toLowerCase())) ||
            (blog.description &&
              blog.description.toLowerCase().includes(search.toLowerCase())) ||
            (blog.content &&
              blog.content.toLowerCase().includes(search.toLowerCase()))
          ) {
            return blog;
          }
        });
        setFilteredBlogs(searchedBlogs);
      }, [search]);

      
        const handleApproveBlog = async (blogId: string): Promise<boolean> => {
          try {
            // console.log(blogId);
            await authAxios.put(`${blogAPI}/${blogId}/moderate-blog/approve`);
            toast.success("Duyệt chấp thuận blog thành công!")
            return true;
          } catch (error: any) {
            toast.error(error?.response.data.message);
            return false;
          } finally{
            setRefresh(prev => !prev);
          }
        };

        const handleRejectBlog = async (blogId: string) : Promise<boolean> => {
          try {
            // console.log(blogId);
            await authAxios.put(`${blogAPI}/${blogId}/moderate-blog/reject`);
            toast.success("Đuyệt từ chối blog thành công!")
            return true;
          } catch (error: any) {
            toast.error(error?.response.data.message);
            return false;
          }finally{
            setRefresh(prev => !prev);
          }
        };

        const handleDeleteBlog = async (blogId: string) : Promise<boolean> => {
          try {
            // console.log(blogId);
            await authAxios.delete(`${blogAPI}/${blogId}/delete`);
            toast.success("Xóa blog thành công!")
            return true;
          } catch (error: any) {
            toast.error(error?.response.data.message);
            return false;
          }finally{
            setRefresh(prev => !prev);
          }
        };


  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách bài viết trong hệ thống
          </h4>
        </div>
        <div className="col-span-12 px-5">
          <Input onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Tìm kiếm theo trạm, tên blog hoặc nội dung' className='mb-2'/>
          <BlogTable
            blogs={filteredBlogs ?? []}
            handleApproveBlog={handleApproveBlog}
            handleRejectBlog={handleRejectBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;
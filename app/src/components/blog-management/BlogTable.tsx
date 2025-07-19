import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Blog } from '@/types/Blog';
import { DataTable } from '@/components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ClipboardPen, Loader2Icon, MoreHorizontal, NotebookText, Trash } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlogDetail from './BlogDetail';
import BlogModeration from './BlogModeration';


const BlogTable = ({
  blogs,
  handleApproveBlog,
  handleRejectBlog,
  handleDeleteBlog,
}: {
  blogs: Blog[];
  handleApproveBlog: (blogId: string) => Promise<boolean>;
  handleRejectBlog: (blogId: string) => Promise<boolean>;
  handleDeleteBlog: (blogId: string) => Promise<boolean>;
}) => {
  const columns: ColumnDef<Blog>[] = [
    {
      header: "STT",
      cell: ({ row }) => {
        return (
          <p className="text-center">{row.index + 1}</p>
        );
      },
    },
    {
      accessorKey: "shelter",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Tạo bởi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="flex gap-2">
            <Avatar>
              <AvatarImage
                src={row.original.shelter.avatar}
                alt={row.original.shelter.name}
              />
            </Avatar>
            <span className="my-auto max-w-[7vw] truncate">{row.original.shelter.name}</span>
          </p>
        );
      },
    },
    {
      accessorKey: "thumbnail_url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Ảnh bìa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          row.original.thumbnail_url && (
            <img
              src={row.original.thumbnail_url}
              alt={row.original._id + " image"}
              className="h-10 w-10"
            />
          )
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Tiêu đề
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p className="max-w-[13vw] truncate">{row.original.title}</p>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        if (row.original.status === "moderating") {
          return <Badge variant="default">Chờ xử lý</Badge>;
        } else if (row.original.status === "published") {
          return (
            <Badge variant="outline" className="bg-green-500 text-white">
              Chấp thuận
            </Badge>
          );
        } else {
          return <Badge variant="destructive">Từ chối</Badge>;
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Ngày tạo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="px-2">
          {new Date(row.original.createdAt).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-40 rounded-md border bg-background shadow-lg p-1"
          >
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              >
                <NotebookText className="w-4 h-4" />{" "}
                <BlogDetail blog={row.original} />
              </DropdownMenuItem>
              {row.original.status === "moderating" &&
              <DropdownMenuItem
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              >
                <ClipboardPen className="w-4 h-4" />{" "}
                <BlogModeration
                  blog={row.original}
                  handleApproveBlog={handleApproveBlog}
                  handleRejectBlog={handleRejectBlog}
                />
              </DropdownMenuItem>
              }
              <DropdownMenuItem
                onClick={() => handleDeleteBlog(row.original._id)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              >
                <Trash className="w-4 h-4" /> Xóa blog
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return <DataTable columns={columns} data={blogs} />;
};

export default BlogTable
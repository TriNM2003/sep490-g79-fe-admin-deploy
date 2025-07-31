import type { Blog } from "@/types/Blog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";

const BlogDetail = ({ blog }: { blog: Blog }) => {
  if (!blog) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Xem chi tiết</p>
      </DialogTrigger>

      <DialogContent className="min-w-[60vw] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {blog.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 0 mt-1">
            <div className="flex gap-2 text-sm text-muted-foreground">
              <Avatar className="h-8 w-8 my-auto">
                <AvatarImage
                  src={blog.shelter.avatar}
                  alt="shelter avatar"
                  className="cursor-pointer"
                />
              </Avatar>
              <div>
                <span className="text-md font-md">
                  {blog.shelter?.name || "Trạm A"}
                </span>
                <p className="flex">
                  {new Date(blog.createdAt).toLocaleString("vi-VN", {
                    dateStyle: "full",
                  })}
                </p>
              </div>
            </div>
            {blog.shelter.address && (
              <div className="text-sm italic text-muted-foreground">
                <p>
                  <strong>Địa điểm</strong>: {blog.shelter.address}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        {blog.thumbnail_url && (
          <img
            src={blog.thumbnail_url}
            alt="Blog Thumbnail"
            className="w-full h-auto max-h-[400px] object-cover rounded-md mb-6"
          />
        )}

        {blog.description && (
          <p className="italic text-base text-gray-700 mb-6">
            {blog.description}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none text-justify [&>*]:mb-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-10 text-sm text-right text-gray-500 italic">
          Cập nhật lần cuối:{" "}
          {new Date(blog.updatedAt).toLocaleString("vi-VN", {
            dateStyle: "full",
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetail;

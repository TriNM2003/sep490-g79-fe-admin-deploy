import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppContext from '@/context/AppContext';
import type { PostReportDetailDialog } from '@/types/DetailDialog';
import type { DonationTableData } from '@/types/DonationTableData';
import type { ReportPost, ReportUser } from '@/types/ReportTableData';
import type ReportTableData from '@/types/ReportTableData';
import type { User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Loader2Icon, MoreHorizontal, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";


type dialogDetail = {
  isOpen: boolean;
  detail: {
    _id: string;
      reportType: string;
      post?: ReportPost;   
      reportedBy: ReportUser;
      reviewedBy?: ReportUser;
      reason: string;
      photos?: string[];
      status: string;
      createdAt: Date; 
      updatedAt: Date;
  };
};

const statusTiengViet = (statusName: string) => {
    if (statusName === "approved") {
      return (
        <p className="uppercase font-semibold text-green-600">Chấp thuận</p>
      );
    } else if (statusName === "rejected") {
      return <p className="uppercase font-semibold text-red-600">Từ chối</p>;
    } else {
      return (
        <p className="uppercase font-semibold text-amber-600">Chờ xử lý</p>
      );
    }
  };

const PostReportManagement = () => {
      const [postReports, setPostReports] = useState<ReportTableData[]>([]);
      const [filteredPostReports, setFilteredPostReports] = useState<ReportTableData[]>([]);
      const {reportAPI} = useContext(AppContext);
      const authAxios = useAuthAxios();
      const [loading, setLoading] = useState<boolean>(false);
      const [refresh, setRefresh] = useState<boolean>(false);
      const [isPreview, setIsPreview] = useState<boolean>(false);
      const [currentIndex, setCurrentIndex] = useState<number>(0);
      const [isFullVisionLength, setIsFullVisionLength] = useState<boolean>(false);
      const [dialogDetail, setDialogDetail] = useState<dialogDetail>({
        isOpen: false,
        detail: {
          _id: "rpt004",
          reportType: "post",
          post: {
            _id: "post567",
            title: "Bán mèo giá rẻ",
            photos: ["https://example.com/post2.jpg"],
            privacy: "public",
            createdBy: {
              _id: "user006",
              fullName: "Lý Thị F",
              email: "lyf@example.com",
              avatar: "https://example.com/avatar6.jpg",
            },
            status: "active",
          },
          reportedBy: {
            _id: "user007",
            fullName: "Đặng Văn G",
            email: "dangvg@example.com",
            avatar: "https://example.com/avatar7.jpg",
          },
          reason: "Nội dung nghi ngờ lừa đảo.",
          photos: ["https://example.com/evidence2.jpg"],
          status: "pending",
          createdAt: new Date("2025-07-04T09:00:00.000Z"),
          updatedAt: new Date("2025-07-04T09:00:00.000Z"),
        },
      });
      const postPhotos = dialogDetail.detail?.post?.photos ?? [] //anh tu post
      const evidencePhotos = dialogDetail.detail?.photos ?? []  //anh tu bang chung
      const allPhotos = [...postPhotos, ...evidencePhotos] //tat ca anh


      useEffect(() => {
        authAxios.get(`${reportAPI}/get-pending-post-reports`)
        .then(({data}) => {
          console.log(data)
          setPostReports(data);
          setFilteredPostReports(data);
        }) 
        .catch((err) => console.log(err?.response.data.message))
      }, [refresh])

      const columns: ColumnDef<ReportTableData>[] = [
        {
          header: "STT",
          cell: ({ row, table }) => {
            const pageIndex = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            return (
              <p className="text-center">
                {pageIndex * pageSize + row.index + 1}
              </p>
            );
          },
        },
         {
          accessorKey: "post",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Bài viết
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return <p className='flex gap-2'>
              <Avatar>
                <AvatarImage src={row.original.post?.photos[0]} alt={row.original.post?.title} />
              </Avatar>
              <span className='my-auto max-w-25 truncate'>{row.original.post?.title}</span>
            </p>;
          },
        },
        {
          accessorKey: "reason",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Lý do
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return <p className='px-2'>{row.original.reason}</p>;
          },
        },
                {
          accessorKey: "reportedBy",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Báo cáo bởi
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return <p className='flex gap-2'>
              <Avatar>
                <AvatarImage src={row.original.reportedBy.avatar} alt={row.original.reportedBy.fullName} />
              </Avatar>
              <span className='my-auto max-w-20 truncate'>{row.original.reportedBy.fullName}</span>
            </p>;
          },
        },
        {
          accessorKey: "status",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Trạng thái
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            if(row.original.status === "pending"){
                return <Badge variant="default">Chờ xử lý</Badge>;
            }else if(row.original.status === "aprroved"){
                return <Badge variant="outline" className='bg-green-500 text-white'>Chấp thuận</Badge>;
            }else{
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
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
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
                  onClick={() => {
                    setDialogDetail({detail: {...row.original}, isOpen: true})
                  }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
                  >
                    <NotebookText className="w-4 h-4" /> Xem/duyệt
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

  // hien thi preview anh
    if (isPreview) {
        return (
    dialogDetail.detail.photos &&
    dialogDetail.detail.photos.length > 0 && (
    <Lightbox
    open={isPreview}
    close={() => setIsPreview(false)}
    index={currentIndex}
    slides={allPhotos.map((src) => ({ src }))}
    plugins={[Zoom]}
    />
    )
    );
    }

    const handleApprovePostReport = async (reportData: PostReportDetailDialog) => {
          try {
            setLoading(true);
            await authAxios.put(`${reportAPI}/review/post/${reportData.detail._id}/approve`)
            setDialogDetail({...dialogDetail, isOpen: false});
            setRefresh(prev => !prev)
            toast.success("Xử lý báo cáo thành công!")
          } catch (error: any) {
            toast.error(error?.response.data.message);
          } finally{
            setLoading(false)
          }
        };
    
        const handleRejectPostReport = async (reportData: PostReportDetailDialog) => {
          try {
            setLoading(true);
            await authAxios.put(`${reportAPI}/review/post/${reportData.detail._id}/reject`)
            setDialogDetail({...dialogDetail, isOpen: false});
            setRefresh(prev => !prev)
            toast.success("Xử lý báo cáo thành công!")
          } catch (error: any) {
            toast.error(error?.response.data.message);
          } finally{
            setLoading(false)
          }
        };


  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách báo cáo post
          </h4>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={columns} data={filteredPostReports ?? []} />
        </div>
      </div>

       <Dialog
  open={dialogDetail.isOpen}
  onOpenChange={(open) => {
    if (!open) {
      setDialogDetail({ ...dialogDetail, isOpen: false });
      close();
    }
  }}
>
  <DialogContent className="!max-w-[55vw] !max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Chi tiết báo cáo bài viết</DialogTitle>
      <DialogDescription>
        Thông tin chi tiết về bài viết bị báo cáo
      </DialogDescription>
    </DialogHeader>

    <div className="grid grid-cols-12 gap-6 py-4 text-sm">
      {/* Bài viết bị báo cáo */}
      <div className="col-span-12">
        <h3 className="text-base font-semibold mb-2">Bài viết bị báo cáo</h3>
        <div className="grid grid-cols-12 gap-4 bg-muted p-4 rounded-lg">
          <div className="col-span-4 space-y-3">
            <div>
              <p className="font-medium">Người đăng</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={dialogDetail.detail?.post?.createdBy?.avatar} />
                </Avatar>
                <p>{dialogDetail.detail?.post?.createdBy?.fullName}</p>
              </div>
            </div>
            <div>
              <p className="font-medium">Trạng thái</p>
              <p className="capitalize font-semibold text-blue-600">
                {dialogDetail.detail?.post?.status}
              </p>
            </div>
            <div>
              <p className="font-medium">Chế độ hiển thị</p>
              <Badge>{dialogDetail.detail.post?.privacy === "public" ? "Công khai" : "Riêng tư"}</Badge>
            </div>
          </div>
          <div className="col-span-8 space-y-3">
            <div>
              <p className="font-medium">Tiêu đề</p>
              {dialogDetail.detail?.post?.title && dialogDetail.detail?.post?.title.length >= 300 && !isFullVisionLength &&
                <>
                  <p>{dialogDetail.detail?.post?.title.slice(0,300)}</p>
                  <a className='text-blue-500 underline cursor-pointer' onClick={() => {
                    setIsFullVisionLength(true);
                  }}>Đọc thêm</a>
                </>
              }
              {dialogDetail.detail?.post?.title && dialogDetail.detail?.post?.title.length >= 300 && isFullVisionLength &&
                <>
                  <p>{dialogDetail.detail?.post?.title}</p>
                  <a className='text-blue-500 underline cursor-pointer' onClick={() => {
                    setIsFullVisionLength(false);
                  }}>Rút gọn</a>
                </>
              }
              {dialogDetail.detail?.post?.title && dialogDetail.detail?.post?.title.length < 300 &&
                  <p>{dialogDetail.detail?.post?.title}</p>
              }
            </div>
            <div>
              <p className="font-medium">Ảnh bài viết</p>
              <div className="flex gap-2 mt-1">
                {postPhotos?.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`post-photo-${idx}`}
                    className="h-24 w-36 object-cover rounded border cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      setCurrentIndex(idx)
                      setIsPreview(true)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết báo cáo */}
      <div className="col-span-12">
        <h3 className="text-base font-semibold mb-2">Chi tiết báo cáo</h3>
        <div className="grid grid-cols-12 gap-4 bg-muted p-4 rounded-lg">
          <div className="col-span-6 space-y-3">
            <div>
              <p className="font-medium">Người báo cáo</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={dialogDetail.detail?.reportedBy?.avatar} />
                </Avatar>
                <p>{dialogDetail.detail?.reportedBy?.fullName}</p>
              </div>
            </div>
            <div>
              <p className="font-medium">Lý do báo cáo</p>
              {dialogDetail.detail?.reason.length >= 300 && !isFullVisionLength &&
                <>
                  <p>{dialogDetail.detail?.reason.slice(0,300)}</p>
                  <a onClick={() => {
                    setIsFullVisionLength(true);
                  }}>Đọc thêm</a>
                </>
              }
              {dialogDetail.detail?.reason.length >= 300 && isFullVisionLength &&
                <>
                  <p>{dialogDetail.detail?.reason}</p>
                  <a onClick={() => {
                    setIsFullVisionLength(false);
                  }}>Rút gọn</a>
                </>
              }
              {dialogDetail.detail?.reason.length < 300 &&
                  <p>{dialogDetail.detail?.reason}</p>
              }
              
            </div>
            {dialogDetail.detail?.reviewedBy && <div>
              <p className="font-medium">Xử lý bởi</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={dialogDetail.detail?.reviewedBy?.avatar} />
                </Avatar>
                <p>{dialogDetail.detail?.reviewedBy?.fullName}</p>
              </div>
            </div>}
          </div>
          <div className="col-span-6 space-y-3">
            <div>
              <p className="font-medium">Trạng thái xử lý</p>
              {statusTiengViet(dialogDetail.detail?.status)}
            </div>
            <div>
              <p className="font-medium">Ngày báo cáo</p>
              <p>{new Date(dialogDetail.detail?.createdAt).toLocaleString("vi-VN")}</p>
            </div>
            <div>
              <p className="font-medium">Xử lý vào</p>
              <p>{new Date(dialogDetail.detail?.updatedAt).toLocaleString("vi-VN")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ảnh bằng chứng */}
      {dialogDetail.detail.photos && dialogDetail.detail.photos?.length > 0 && (
        <div className="col-span-12 max-w-[32vw]">
          <p className="text-base font-semibold mb-2">Ảnh bằng chứng</p>
          <div className="flex flex-wrap gap-3 p-2 border rounded-md">
            {evidencePhotos?.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`evidence-${idx}`}
                onClick={() => {
                  setCurrentIndex(postPhotos.length + idx)
                  setIsPreview(true)
                }}
                className="h-24 w-36 object-cover rounded cursor-pointer border hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      )}
    </div>

    <DialogFooter>
      <DialogClose asChild>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setDialogDetail({ ...dialogDetail, isOpen: false })}
        >
          Đóng
        </Button>
      </DialogClose>

      {dialogDetail.detail.status === "pending" && (
        <>
          {loading ? (
            <Button disabled><Loader2Icon className="mr-2 animate-spin" /> Vui lòng chờ</Button>
          ) : (
            <>
              <Button onClick={() => handleApprovePostReport(dialogDetail)}>
                Chấp thuận
              </Button>
              <Button variant="destructive" onClick={() => handleRejectPostReport(dialogDetail)}>
                Từ chối
              </Button>
            </>
          )}
        </>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default PostReportManagement;
import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppContext from '@/context/AppContext';
import type { DonationTableData } from '@/types/DonationTableData';
import type { ReportPost, ReportUser } from '@/types/ReportTableData';
import type ReportTableData from '@/types/ReportTableData';
import type { User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Loader2Icon, MoreHorizontal, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";


export const mockReportData: ReportTableData[] = [
  {
    _id: "rpt004",
    reportType: "post",
    post: {
      _id: "post567",
      title: "Bán mèo giá rẻ",
      photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCsqRYLAFDdL4Ix_AHai7kNVyoPV9Ssv1xg&s", "https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg"],
      privacy: ["public"],
      createdBy: {
        _id: "user006",
        fullName: "Lý Thị F",
        email: "lyf@example.com",
        avatar: "https://thumbs.dreamstime.com/b/d-icon-avatar-cute-smiling-woman-cartoon-hipster-character-people-close-up-portrait-isolated-transparent-png-background-345284600.jpg"
      },
      status: "active"
    },
    reportedBy: {
      _id: "user007",
      fullName: "Đặng Văn G",
      email: "dangvg@example.com",
      avatar: "https://thumbs.dreamstime.com/b/d-icon-avatar-cute-smiling-woman-cartoon-hipster-character-people-close-up-portrait-isolated-transparent-png-background-345284600.jpg"
    },
    reason: "Nội dung nghi ngờ lừa đảo.",
    photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQLTuxZA10DcnEpMqqA0P1zjgQJgYNE9Tkw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GWXCDhEZj3Czmg297R6BezEqmvnTnFgl_A&s"],
    status: "pending",
    createdAt: new Date("2025-07-04T09:00:00.000Z"),
    updatedAt: new Date("2025-07-04T09:00:00.000Z")
  },
];

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

const BlogManagement = () => {
      const [donationData, setDonationData] = useState<DonationTableData[]>([]);
      const [filteredDonations, setFilteredDonations] = useState<DonationTableData[]>([]);
      // const {userAPI, donationAPI} = useContext(AppContext);
      const authAxios = useAuthAxios();
      const [loading, setLoading] = useState<boolean>(false);
      const [donationRefresh, setDonationRefresh] = useState<boolean>(false);
      const [isPreview, setIsPreview] = useState<boolean>(false);
      const [currentIndex, setCurrentIndex] = useState<number>(0);
      const [dialogDetail, setDialogDetail] = useState<dialogDetail>({
        isOpen: false,
        detail: {
          _id: "rpt004",
          reportType: "post",
          post: {
            _id: "post567",
            title: "Bán mèo giá rẻ",
            photos: ["https://example.com/post2.jpg"],
            privacy: ["public"],
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

      // useEffect(() => {
      //   authAxios.get(`${donationAPI}/get-all`)
      //   .then(({data}) => console.log(data)) 
      //   .catch((err) => console.log(err?.response.data.message))
      // }, [])

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
            return <p className='flex'>
              <Avatar>
                <AvatarImage src={row.original.reportedBy.avatar} alt={row.original.reportedBy.fullName} />
              </Avatar>
              <span>{row.original.reportedBy.fullName}</span>
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
                    <NotebookText className="w-4 h-4" /> Xem thông tin chi tiết
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

        const handleAprroveReport = (data: dialogDetail) => {
          try {
            console.log(data);
          } catch (error: any) {
            console.log(error?.response.data.message);
          }
        };

        const handleRejectReport = (data: dialogDetail) => {
          try {
            console.log(data);
          } catch (error: any) {
            console.log(error?.response.data.message);
          }
        };

  // hien thi preview anh
    if (isPreview) {
        return (
    dialogDetail.detail.photos &&
    dialogDetail.detail.photos.length > 0 && (
    <Lightbox
    open={isPreview}
    close={() => setIsPreview(false)}
    index={currentIndex}
    slides={[
    ...dialogDetail.detail?.post?.photos.map((src) => ({ src })) || [],
    ...dialogDetail.detail?.photos.map((src) => ({ src })) || []
    ]}
    plugins={[Zoom]}
    />
    )
    );
    }


  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách bài viết trong hệ thống
          </h4>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={columns} data={mockReportData ?? []} />
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
  <DialogContent className="!max-w-[60vw] !max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Chi tiết bài blog</DialogTitle>
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
              <p className="font-medium">Tiêu đề</p>
              <p>{dialogDetail.detail?.post?.title || "Không có"}</p>
            </div>
            <div>
              <p className="font-medium">Trạng thái</p>
              <p className="capitalize font-semibold text-blue-600">
                {dialogDetail.detail?.post?.status}
              </p>
            </div>
            <div>
              <p className="font-medium">Chế độ hiển thị</p>
              <p>{dialogDetail.detail?.post?.privacy?.join(", ") || "Không rõ"}</p>
            </div>
          </div>
          <div className="col-span-8 space-y-3">
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
              <p className="font-medium">Ảnh bài viết</p>
              <div className="flex gap-2 mt-1">
                {dialogDetail.detail?.post?.photos?.map((photo, idx) => (
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
              <p>{dialogDetail.detail?.reason || "Không có"}</p>
            </div>
          </div>
          <div className="col-span-6 space-y-3">
            <div>
              <p className="font-medium">Trạng thái xử lý</p>
              <p className="capitalize font-semibold text-blue-600">
                {dialogDetail.detail?.status}
              </p>
            </div>
            <div>
              <p className="font-medium">Ngày báo cáo</p>
              <p>{new Date(dialogDetail.detail?.createdAt).toLocaleString("vi-VN")}</p>
            </div>
            <div>
              <p className="font-medium">Cập nhật lúc</p>
              <p>{new Date(dialogDetail.detail?.updatedAt).toLocaleString("vi-VN")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ảnh bằng chứng */}
      {dialogDetail.detail.photos && dialogDetail.detail.photos?.length > 0 && (
        <div className="col-span-12">
          <p className="text-base font-semibold mb-2">Ảnh bằng chứng</p>
          <div className="flex flex-wrap gap-3 p-2 border rounded-md">
            {dialogDetail.detail.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`evidence-${idx}`}
                onClick={() => {
                  setCurrentIndex(idx)
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
              <Button onClick={() => handleAprroveReport(dialogDetail)}>
                Chấp thuận
              </Button>
              <Button variant="destructive" onClick={() => handleRejectReport(dialogDetail)}>
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

export default BlogManagement;
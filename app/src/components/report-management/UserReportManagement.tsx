import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppContext from '@/context/AppContext';
import type { DonationTableData } from '@/types/DonationTableData';
import type ReportTableData from '@/types/ReportTableData';
import type { User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'

export const mockReportData: ReportTableData[] = [
  {
    _id: "rpt001",
    reportType: "user",
    user: {
      _id: "user001",
      fullName: "Nguyễn Văn A",
      email: "vana@example.com",
      avatar: "https://example.com/avatar1.jpg",
      phoneNumber: "0901234567",
      bio: "Tôi yêu động vật",
      dob: "2000-05-20T00:00:00.000Z",
      address: "Hà Nội",
      location: { lat: 21.0278, lng: 105.8342 },
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2025-01-01T10:00:00.000Z",
      background: "https://example.com/bg1.jpg"
    },
    reportedBy: {
      _id: "user002",
      fullName: "Trần Thị B",
      email: "tranb@example.com",
      avatar: "https://example.com/avatar2.jpg",
    },
    reviewedBy: {
      _id: "admin001",
      fullName: "Admin Kiểm Duyệt",
      email: "admin@example.com",
      avatar: "https://example.com/admin.jpg"
    },
    reason: "Tài khoản có hành vi spam.",
    photos: [],
    status: "approved",
    createdAt: "2025-07-01T08:00:00.000Z",
    updatedAt: "2025-07-01T09:00:00.000Z"
  },
  {
    _id: "rpt002",
    reportType: "post",
    post: {
      _id: "post123",
      title: "Cần cho mèo ăn",
      photos: ["https://example.com/post1.jpg"],
      privacy: ["public"],
      createdBy: {
        _id: "user003",
        fullName: "Lê Văn C",
        email: "lec@example.com",
        avatar: "https://example.com/avatar3.jpg"
      },
      status: "active",
      createdAt: "2025-06-28T14:00:00.000Z"
    },
    reportedBy: {
      _id: "user004",
      fullName: "Nguyễn Thị D",
      email: "nguyend@example.com",
      avatar: "https://example.com/avatar4.jpg"
    },
    reason: "Bài viết chứa nội dung không phù hợp.",
    photos: ["https://example.com/evidence1.jpg"],
    status: "pending",
    createdAt: "2025-07-03T12:30:00.000Z",
    updatedAt: "2025-07-03T12:30:00.000Z"
  },
  {
    _id: "rpt003",
    reportType: "blog",
    blog: {
      _id: "blog999",
      title: "Cách chăm sóc chó con mùa hè",
      description: "Hướng dẫn cơ bản về chăm sóc thú nuôi.",
      content: "Chi tiết từng bước cách chăm sóc...",
      thumbnail_url: "https://example.com/blogthumb.jpg",
      status: "published",
      shelter: {
        _id: "shelter01",
        name: "Paws & Claws Rescue Center",
        avatar: "https://example.com/shelter.jpg",
        address: "123 Đường Yêu Thương, Quận 1, TP.HCM"
      },
      createdAt: "2025-06-20T10:00:00.000Z"
    },
    reportedBy: {
      _id: "user005",
      fullName: "Phạm Văn E",
      email: "phame@example.com",
      avatar: "https://example.com/avatar5.jpg"
    },
    reason: "Thông tin sai lệch.",
    photos: [],
    status: "rejected",
    createdAt: "2025-07-02T11:00:00.000Z",
    updatedAt: "2025-07-02T15:00:00.000Z"
  },
  {
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
        avatar: "https://example.com/avatar6.jpg"
      },
      status: "active"
    },
    reportedBy: {
      _id: "user007",
      fullName: "Đặng Văn G",
      email: "dangvg@example.com",
      avatar: "https://example.com/avatar7.jpg"
    },
    reason: "Nội dung nghi ngờ lừa đảo.",
    photos: ["https://example.com/evidence2.jpg"],
    status: "pending",
    createdAt: "2025-07-04T09:00:00.000Z",
    updatedAt: "2025-07-04T09:00:00.000Z"
  },
  {
    _id: "rpt005",
    reportType: "blog",
    blog: {
      _id: "blog456",
      title: "Kinh nghiệm nuôi mèo con",
      content: "Chi tiết từng giai đoạn phát triển của mèo.",
      thumbnail_url: "https://example.com/blog2.jpg",
      status: "moderating",
      shelter: {
        _id: "shelter02",
        name: "Little Paws Sanctuary",
        avatar: "https://example.com/shelter2.jpg",
        address: "456 Đường Ấm Áp, Quận 2, TP.HCM"
      }
    },
    reportedBy: {
      _id: "user008",
      fullName: "Trương Mỹ H",
      email: "truongmh@example.com",
      avatar: "https://example.com/avatar8.jpg"
    },
    reviewedBy: {
      _id: "admin002",
      fullName: "Mod Quản trị",
      email: "mod@example.com",
      avatar: "https://example.com/mod.jpg"
    },
    reason: "Blog có chứa nội dung quảng cáo trá hình.",
    photos: [],
    status: "approved",
    createdAt: "2025-07-05T08:00:00.000Z",
    updatedAt: "2025-07-05T08:30:00.000Z"
  }
];

type dialogDetail = {
  isOpen: boolean;
  detail: {
    donor?: User;
    amount: number,
    message: string,
    createdAt: Date,
    updatedAt: Date,
  };
};

const UserReportManagemnt = () => {
      const [donationData, setDonationData] = useState<DonationTableData[]>([]);
      const [filteredDonations, setFilteredDonations] = useState<DonationTableData[]>([]);
      // const {userAPI, donationAPI} = useContext(AppContext);
      const authAxios = useAuthAxios();
      const [donationRefresh, setDonationRefresh] = useState<boolean>(false);
      // const [dialogDetail, setDialogDetail] = useState<dialogDetail>({
      //   isOpen: false,
      //   detail: {
      //     donor: {
      //       id: "u5",
      //       user: "USR005",
      //       username: "animalhero",
      //       fullName: "Hoàng Thị E",
      //       email: "hoange@example.com",
      //       role: "moderator",
      //       avatar: "https://example.com/avatar/u5.jpg",
      //       createdAt: "2025-01-01T00:00:00Z",
      //     },
      //     amount: 300000,
      //     message: "Tiếp tục sứ mệnh tuyệt vời!",
      //     createdAt: new Date("2025-07-04T16:20:00Z"),
      //     updatedAt: new Date("2025-07-04T16:20:00Z"),
      //   },
      // });

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
            return <Badge>{row.original.status}</Badge>;
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

  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách báo cáo tài khoản
          </h4>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={columns} data={mockReportData ?? []} />
        </div>
      </div>

    </div>
  );
}

export default UserReportManagemnt;
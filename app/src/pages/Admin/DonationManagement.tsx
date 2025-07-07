import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppContext from '@/context/AppContext';
import type { DonationTableData } from '@/types/DonationTableData';
import type { User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useMemo, useState } from 'react'

const mockDonations: DonationTableData[] = [
  {
    _id: "donation1",
    donor: {
      id: "u1",
      userId: "USR001",
      username: "pethugger",
      fullName: "Nguyễn Văn A",
      email: "vana@example.com",
      role: "user",
      avatar: "https://easydrawingguides.com/wp-content/uploads/2024/05/how-to-draw-zoro-from-one-piece-featured-image-1200.png",
      isActive: true,
      phoneNumber: "0901234567",
      createdAt: "2024-10-10T10:00:00Z",
    },
    amount: 500000,
    message: "Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️ Vì các bé thú cưng ❤️",
    createdAt: new Date("2025-06-30T08:00:00Z"),
    updatedAt: new Date("2025-06-30T08:00:00Z"),
  },
  {
    _id: "donation123",
    donor: {
      id: "u1",
      userId: "USR001",
      username: "pethugger",
      fullName: "Nguyễn Văn A",
      email: "vana@example.com",
      role: "user",
      avatar: "https://easydrawingguides.com/wp-content/uploads/2024/05/how-to-draw-zoro-from-one-piece-featured-image-1200.png",
      isActive: true,
      phoneNumber: "0901234567",
      createdAt: "2024-10-10T10:00:00Z",
    },
    amount: 500000,
    message: "Ung ho lan 2",
    createdAt: new Date("2025-06-30T08:00:00Z"),
    updatedAt: new Date("2025-06-30T08:00:00Z"),
  },
  {
    _id: "donation2",
    donor: {
      id: "u2",
      userId: "USR002",
      username: "catlover88",
      fullName: "Trần Thị B",
      email: "tranb@example.com",
      role: "user",
      avatar: "https://example.com/avatar/u2.jpg",
      isActive: true,
      phoneNumber: "0907654321",
      createdAt: "2024-11-15T12:00:00Z",
    },
    amount: 1000000,
    message: "Chúc các bé luôn khỏe mạnh!",
    createdAt: new Date("2025-07-01T09:30:00Z"),
    updatedAt: new Date("2025-07-01T09:30:00Z"),
  },
  {
    _id: "donation3",
    donor: {
      id: "u3",
      userId: "USR003",
      username: "dogfan92",
      fullName: "Lê Văn C",
      email: "levanc@example.com",
      role: "admin",
      avatar: "https://example.com/avatar/u3.jpg",
    },
    amount: 750000,
    message: "Ủng hộ trạm cứu hộ quận 3",
    createdAt: new Date("2025-07-02T14:15:00Z"),
    updatedAt: new Date("2025-07-02T14:15:00Z"),
  },
  {
    _id: "donation4",
    donor: {
      id: "u4",
      userId: "USR004",
      username: "guest123",
      fullName: "Phạm D",
      email: "guest@example.com",
      role: "guest",
      avatar: "https://example.com/avatar/u4.jpg",
      isActive: false,
    },
    amount: 200000,
    message: "Một chút tấm lòng ❤️",
    createdAt: new Date("2025-07-03T11:45:00Z"),
    updatedAt: new Date("2025-07-03T11:45:00Z"),
  },
  {
    _id: "donation5",
    // donor: {
    //   id: "u5",
    //   userId: "USR005",
    //   username: "animalhero",
    //   fullName: "Hoàng Thị E",
    //   email: "hoange@example.com",
    //   role: "moderator",
    //   avatar: "https://example.com/avatar/u5.jpg",
    //   createdAt: "2025-01-01T00:00:00Z",
    // },
    amount: 300000,
    message: "Tiếp tục sứ mệnh tuyệt vời!",
    createdAt: new Date("2025-07-04T16:20:00Z"),
    updatedAt: new Date("2025-07-04T16:20:00Z"),
  },
  {
    _id: "donation6",
    // donor: {
    //   id: "u5",
    //   userId: "USR005",
    //   username: "animalhero",
    //   fullName: "Hoàng Thị E",
    //   email: "hoange@example.com",
    //   role: "moderator",
    //   avatar: "https://example.com/avatar/u5.jpg",
    //   createdAt: "2025-01-01T00:00:00Z",
    // },
    amount: 345230,
    message: "Tiếp tục sứ mệnh tuyệt vời x2!",
    createdAt: new Date("2025-07-04T16:20:00Z"),
    updatedAt: new Date("2025-07-04T16:20:00Z"),
  },
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

type summaryDialogDetail = {
  isOpen: boolean;
  detail: {
    donor?: User;
    amount: number,
    createdAt: Date,
    updatedAt: Date,
  };
};

type DonationSummary = {
  _id: string; 
  donor?: User;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

const DonationManagement = () => {
      const [donationData, setDonationData] = useState<DonationTableData[]>([]);
      const [filteredDonations, setFilteredDonations] = useState<DonationTableData[]>([]);
      // const {userAPI, donationAPI} = useContext(AppContext);
      const authAxios = useAuthAxios();
      const [donationRefresh, setDonationRefresh] = useState<boolean>(false);
      const [dialogDetail, setDialogDetail] = useState<dialogDetail>({
        isOpen: false,
        detail: {
          donor: {
            id: "u5",
            userId: "USR005",
            username: "animalhero",
            fullName: "Hoàng Thị E",
            email: "hoange@example.com",
            role: "moderator",
            avatar: "https://example.com/avatar/u5.jpg",
            createdAt: "2025-01-01T00:00:00Z",
          },
          amount: 300000,
          message: "Tiếp tục sứ mệnh tuyệt vời!",
          createdAt: new Date("2025-07-04T16:20:00Z"),
          updatedAt: new Date("2025-07-04T16:20:00Z"),
        },
      });
      const [summaryDialogDetail, setSummaryDialogDetail] = useState<summaryDialogDetail>({
        isOpen: false,
        detail: {
          donor: {
            id: "u5",
            userId: "USR005",
            username: "animalhero",
            fullName: "Hoàng Thị E",
            email: "hoange@example.com",
            role: "moderator",
            avatar: "https://example.com/avatar/u5.jpg",
            createdAt: "2025-01-01T00:00:00Z",
          },
          amount: 300000,
          createdAt: new Date("2025-07-04T16:20:00Z"),
          updatedAt: new Date("2025-07-04T16:20:00Z"),
        },
      });

      const totalDonationAmount = useMemo(() => {
        return mockDonations.reduce((acc, current) => acc += current.amount, 0);
      }, [mockDonations])

      const groupedDonations: Record<string, DonationSummary> = {};
      mockDonations.forEach((donation) => {
        const donorId = donation.donor?.id || "anonymous";
        if (!groupedDonations[donorId]) {
          groupedDonations[donorId] = {
            _id: donorId,
            donor: donation.donor,
            amount: 0,
            createdAt: donation.createdAt,
            updatedAt: donation.updatedAt,
          };
        }
        groupedDonations[donorId].amount += donation.amount;
      });
      const donationSummary: DonationSummary[] =
        Object.values(groupedDonations);


      // useEffect(() => {
      //   authAxios.get(`${donationAPI}/get-all`)
      //   .then(({data}) => console.log(data)) 
      //   .catch((err) => console.log(err?.response.data.message))
      // }, [])

      const columns: ColumnDef<DonationTableData>[] = [
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
          accessorKey: "donor",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Người quyên góp
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => (
            row.original.donor ?
            <p className='flex gap-2'>
              <Avatar>
                <AvatarImage src={row.original.donor.avatar || "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg"} alt={row.original.donor.fullName} />
              </Avatar>
              <span className='my-auto'>{row.original.donor.fullName}</span>
            </p> : <p className='ms-10 font-semibold'>Khách</p>
          ),
        },
        {
          accessorKey: "amount",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Số tiền (VND)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return <span className="px-2">{row.original.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</span>;
          },
        },
        {
          accessorKey: "message",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Lời nhắn
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return <p className='max-w-[10vw] overflow-hidden text-ellipsis'>{row.original.message}</p>;
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
                Ngày quyên góp
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
                      setDialogDetail({
                        isOpen: true,
                        detail: {
                          donor: row.original.donor,
                          amount: row.original.amount,
                          message: row.original.message,
                          createdAt: row.original.createdAt,
                          updatedAt: row.original.updatedAt,
                        },
                      });
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

      const TopDonatorColumns: ColumnDef<DonationSummary>[] = [
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
          accessorKey: "donor",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Người quyên góp
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) =>
            row.original.donor ? (
              <p className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={
                      row.original.donor.avatar ||
                      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg"
                    }
                    alt={row.original.donor.fullName}
                  />
                </Avatar>
                <span className="my-auto">{row.original.donor.fullName}</span>
              </p>
            ) : (
              <p className="ms-10 font-semibold">Khách</p>
            ),
        },
        {
          accessorKey: "amount",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Tổng số tiền (VND)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return (
              <span className="px-2">
                {row.original.amount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            );
          },
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
                      setSummaryDialogDetail({
                        isOpen: true,
                        detail: {
                          donor: row.original.donor,
                          amount: row.original.amount,
                          createdAt: row.original.createdAt,
                          updatedAt: row.original.updatedAt,
                        },
                      });
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

  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách quyên góp vào hệ thống PawShelter
          </h4>
          <Badge className='mx-auto my-2 px-7 py-4 text-xl'>Tổng số tiền được quyên góp: 
            <span className='ms-2'>{totalDonationAmount.toLocaleString("vi-VN", {style: "currency",currency: "VND",})}</span>
            </Badge>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={columns} data={mockDonations ?? []} />
        </div>
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách tổng cộng quyên góp theo từng người
          </h4>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={TopDonatorColumns} data={donationSummary ?? []} />
        </div>
      </div>

      <Dialog
        open={dialogDetail.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDialogDetail({
              ...dialogDetail,
              isOpen: false,
            });
            close();
          }
        }}
      >
        <DialogContent className="max-w-[70vw]">
          <DialogHeader>
            <DialogTitle>Chi tiết ủng hộ</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về khoản đóng góp
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
            {/* Cột trái: Thông tin người ủng hộ */}
            {dialogDetail.detail?.donor ? (
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Ảnh đại diện</p>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={dialogDetail.detail.donor.avatar} />
                  </Avatar>
                </div>

                <div>
                  <p className="font-medium mb-1">Họ và tên</p>
                  <p>
                    {dialogDetail.detail.donor.fullName || "Không có dữ liệu"}
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p>{dialogDetail.detail.donor.email || "Không có dữ liệu"}</p>
                </div>

                <div>
                  <p className="font-medium mb-1">Số điện thoại</p>
                  <p>
                    {dialogDetail.detail.donor.phoneNumber ||
                      "Không có dữ liệu"}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Cột phải: Thông tin ủng hộ */}
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Số tiền ủng hộ</p>
                <p className="text-green-600 font-semibold">
                  {dialogDetail.detail?.amount?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || "0 VND"}
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">Lời nhắn</p>
                <p className="italic max-h-[20vh] overflow-y-scroll">
                  {dialogDetail.detail?.message || "Không có lời nhắn"}
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">Ngày quyên góp</p>
                <p>
                  {dialogDetail.detail?.createdAt
                    ? new Date(dialogDetail.detail.createdAt).toLocaleString(
                        "vi-VN"
                      )
                    : "Không có dữ liệu"}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setDialogDetail({ ...dialogDetail, isOpen: false })
                }
              >
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={summaryDialogDetail.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSummaryDialogDetail({
              ...summaryDialogDetail,
              isOpen: false,
            });
            close();
          }
        }}
      >
        <DialogContent className="max-w-[70vw]">
          <DialogHeader>
            <DialogTitle>Chi tiết ủng hộ</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về khoản đóng góp
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 py-3 px-2">
            {/* Cột trái: Thông tin người ủng hộ */}
            {summaryDialogDetail.detail?.donor ? (
              <>
                <div>
                  <p className="font-medium mb-1">Ảnh đại diện</p>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={summaryDialogDetail.detail.donor.avatar} />
                  </Avatar>
                </div>

                <div>
                  <p className="font-medium mb-1">Họ và tên</p>
                  <p>
                    {summaryDialogDetail.detail.donor.fullName || "Không có dữ liệu"}
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p>{summaryDialogDetail.detail.donor.email || "Không có dữ liệu"}</p>
                </div>

                <div>
                  <p className="font-medium mb-1">Số điện thoại</p>
                  <p>
                    {summaryDialogDetail.detail.donor.phoneNumber ||
                      "Không có dữ liệu"}
                  </p>
                </div>
              </>
            ) : <div>
                  <p className="font-medium mb-1">Người ủng hộ</p>
                  <p>
                    Khách (ẩn danh)
                  </p>
                </div>}

              <div>
                <p className="font-medium mb-1">Tổng số tiền ủng hộ</p>
                <p className="text-green-600 font-semibold">
                  {summaryDialogDetail.detail?.amount?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || "0 VND"}
                </p>
              </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setSummaryDialogDetail({ ...summaryDialogDetail, isOpen: false })
                }
              >
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DonationManagement
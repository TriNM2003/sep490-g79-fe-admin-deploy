import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppContext from "@/context/AppContext";
import useAuthAxios from "@/utils/authAxios";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon, HashIcon, Link, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Badge } from "../ui/badge";
import type { Shelter } from "@/types/Shelter";
import ShelterDetailDialog from "./ShelterDetailDialog";


const ShelterList = () => {
  const [shelterData, setShelterData] = useState<Shelter[]>([]);
  const [filteredShelterData, setFilteredShelterData] = useState<
    Shelter[]
  >([]);
  const authAxios = useAuthAxios();
  const { shelterAPI } = useContext(AppContext);

  useEffect(() => {
    authAxios
      .get(`${shelterAPI}/get-shelters-list`)
      .then(({ data }) => {
        console.log(data)
        setShelterData(data);
        setFilteredShelterData(data);
      })
      .catch((error) => {
        console.log(error?.response.data.message);
      });
  }, []);

  const columns: ColumnDef<Shelter>[] = [
    {
      header: "STT",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="max-w-30 overflow-hidden text-ellipsis">
            {row.original.email}
          </p>
        );
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Địa chỉ
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="max-w-30 overflow-hidden text-ellipsis">
            {row.original.address}
          </p>
        );
      },
    },
    {
      accessorKey: "foundationDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Ngày thành lập
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span className="px-2">
            {new Date(row.original.foundationDate).toLocaleDateString("vi-VN")}
          </span>
        );
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
        const status = row.original.status as string;

        const statusMap: Record<
          string,
          {
            label: string;
            variant: "default" | "destructive" | "secondary";
          }
        > = {
          active: { label: "Đang hoạt động", variant: "default" },
          banned: { label: "Bị cấm", variant: "destructive" },
          rejected: { label: "Từ chối", variant: "destructive" },
          verifying: { label: "Đang chờ duyệt", variant: "secondary" },
        };

        const { label, variant } = statusMap[status] || {
          label: "Không xác định",
          variant: "outline",
        };

        return <Badge variant={variant}>{label}</Badge>;
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
      cell: ({ row }) => {
        return (
          <span className="px-2">
            {new Date(row.original.createdAt).toLocaleDateString("vi-vn")}
          </span>
        );
      },
    },
    {
      accessorKey: "updateAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="cursor-pointer"
          >
            Lần cuối cập nhập
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span className="px-2">
            {new Date(row.original.updatedAt).toLocaleDateString("vi-vn")}
          </span>
        );
      },
    },
    {
      header: "Chi tiết",
      cell: ({ row }) => {
        console.log(row.original)
        return <ShelterDetailDialog shelter={row.original} />
      },
    },
  ];

  function searchShelterByNameEmailHotlineAddress(
    shelterData: Shelter[],
    keyword: string
  ) {
    const trimmedKeyword = keyword.trim().toLowerCase();

    // Nếu keyword rỗng thì trả về toàn bộ danh sách ban đầu
    if (trimmedKeyword === "") {
      setFilteredShelterData(shelterData);
      return;
    }

    const result: Shelter[] = shelterData.filter((shelter) => {
      return (
        shelter.name.toLowerCase().includes(trimmedKeyword) ||
        shelter.email.toLowerCase().includes(trimmedKeyword) ||
        shelter.address.toLowerCase().includes(trimmedKeyword)||
        shelter.hotline.toString().includes(trimmedKeyword)
      );
    });
    setFilteredShelterData(result);
  }

  return (
    <>
      <div className="col-span-12 px-5 flex flex-col gap-5">
        <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
          Danh sách trạm cứu hộ
        </h4>
        <Input
          type="string"
          placeholder="Tìm kiếm theo tên, email, hotline hoặc địa chỉ"
          className="max-w-1/3"
          onChange={(e) =>
            searchShelterByNameEmailHotlineAddress(shelterData, e.target.value)
          }
        />
      </div>
      <div className="col-span-12 px-5 mt-2">
        <DataTable columns={columns} data={filteredShelterData ?? []} />
      </div>
    </>
  );
};

export default ShelterList;

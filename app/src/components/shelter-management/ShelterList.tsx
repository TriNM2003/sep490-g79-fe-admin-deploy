import { DataTable } from '@/components/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppContext from '@/context/AppContext';
import type { ShelterTableData } from '@/types/ShelterTableData';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Link } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const examplePhoto = "https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg";

// const sheltersDataExample: ShelterTableData[] = [
//   {
//     index: 1,
//     avatar: "https://example.com/avatar1.jpg",
//     name: "Happy Paws Shelter",
//     email: "contact@happypaws.org",
//     hotline: 123456789,
//     address: "123 Nguyen Van Linh, Da Nang",
//     membersCount: 12,
//     shelterLicenseURL: examplePhoto,
//     foundationDate: new Date("2018-05-15"),
//     warningCount: 0,
//     status: "active",
//     createdAt: new Date("2023-01-10T09:30:00"),
//     updateAt: new Date("2024-12-20T14:15:00"),
//   },
//   {
//     index: 2,
//     avatar: "https://example.com/avatar2.jpg",
//     name: "Green Forest Shelter",
//     email: "info@greenforest.vn",
//     hotline: 987654321,
//     address: "456 Le Duan, Hanoi",
//     membersCount: 8,
//     shelterLicenseURL: "https://example.com/licenses/greenforest.pdf",
//     foundationDate: new Date("2016-08-01"),
//     warningCount: 2,
//     status: "banned",
//     createdAt: new Date("2022-07-12T10:00:00"),
//     updateAt: new Date("2023-11-05T16:00:00"),
//   },
//   {
//     index: 3,
//     avatar: "https://example.com/avatar3.jpg",
//     name: "Sunshine Animal Home",
//     email: "hello@sunshinehome.org",
//     hotline: 112233445,
//     address: "789 Cach Mang Thang 8, Ho Chi Minh City",
//     membersCount: 15,
//     shelterLicenseURL: "https://example.com/licenses/sunshine.pdf",
//     foundationDate: new Date("2020-01-20"),
//     warningCount: 1,
//     status: "active",
//     createdAt: new Date("2024-03-22T11:20:00"),
//     updateAt: new Date("2025-04-01T13:45:00"),
//   },
//   {
//     index: 4,
//     avatar: "https://example.com/avatar4.jpg",
//     name: "Animal Care House",
//     email: "support@animalcare.vn",
//     hotline: 556677889,
//     address: "321 Tran Hung Dao, Can Tho",
//     membersCount: 6,
//     shelterLicenseURL: "https://example.com/licenses/animalcare.pdf",
//     foundationDate: new Date("2015-11-05"),
//     warningCount: 0,
//     status: "active",
//     createdAt: new Date("2023-09-17T08:45:00"),
//     updateAt: new Date("2024-10-22T09:00:00"),
//   },
//   {
//     index: 5,
//     avatar: "https://example.com/avatar5.jpg",
//     name: "Rescue Paws Vietnam",
//     email: "team@rescuepaws.vn",
//     hotline: 334455667,
//     address: "654 Vo Van Kiet, Hue",
//     membersCount: 10,
//     shelterLicenseURL: "https://example.com/licenses/rescuepaws.pdf",
//     foundationDate: new Date("2019-04-30"),
//     warningCount: 3,
//     status: "banned",
//     createdAt: new Date("2021-12-25T07:10:00"),
//     updateAt: new Date("2022-08-15T15:30:00"),
//   },
// ];

const ShelterList = () => {
    const [shelterData, setShelterData] = useState<ShelterTableData[]>([]);
    const [filteredShelterData, setFilteredShelterData] = useState<ShelterTableData[]>([]);
    const authAxios = useAuthAxios();
    const {shelterAPI} = useContext(AppContext);

    useEffect(() => {
        authAxios.get(`${shelterAPI}/get-shelters-list`)
        .then(({data}) => {
          // console.log(data)
          setShelterData(data);
          setFilteredShelterData(data);
        })
        .catch(error => {
          console.log(error?.response.data.message);
        })
    }, [])


    const columns: ColumnDef<ShelterTableData>[] = [
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
        return <p className='max-w-30 overflow-hidden text-ellipsis'>{row.original.email}</p>
      }
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
        return <p className='max-w-30 overflow-hidden text-ellipsis'>{row.original.address}</p>
      }
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
        return <span className='px-2'>{new Date(row.original.foundationDate).toLocaleDateString("vi-VN")}</span>
      }
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
        const status = row.original.status;
        const color =
          status === "active"
            ? "text-green-500 font-semibold uppercase"
            : "text-red-500 font-semibold uppercase"
        let statusTiengViet = '';
        if(status === "active"){
            statusTiengViet = "Đang hoạt động" 
        }else{
            statusTiengViet = "Bị cấm"
        }
        return <span className={color}>{statusTiengViet}</span>;
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
      cell: ({row}) => {
          return <span className='px-2'>{new Date(row.original.createdAt).toLocaleDateString("vi-vn")}</span>
      }
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
      cell: ({row}) => {
          return <span className='px-2'>{new Date(row.original.updateAt).toLocaleDateString("vi-vn")}</span>
      }
    },
  ];

  function searchShelterByNameEmailHotlineAddress(
    shelterData: ShelterTableData[],
    keyword: string
  ) {
    const trimmedKeyword = keyword.trim().toLowerCase();

    // Nếu keyword rỗng thì trả về toàn bộ danh sách ban đầu
    if (trimmedKeyword === "") {
      setFilteredShelterData(shelterData);
      return;
    }

    const result: ShelterTableData[] = shelterData.filter((shelter) => {
      return (
        shelter.name.toLowerCase().includes(trimmedKeyword) ||
        shelter.email.toLowerCase().includes(trimmedKeyword) ||
        shelter.address.toLowerCase().includes(trimmedKeyword) ||
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
        <Input type="string" placeholder="Tìm kiếm theo tên, email, hotline hoặc địa chỉ" className='max-w-1/3' 
        onChange={(e) =>
              searchShelterByNameEmailHotlineAddress(shelterData, e.target.value)
            }/>
      </div>
      <div className="col-span-12 px-5 mt-2">
        <DataTable columns={columns} data={filteredShelterData ?? []} />
      </div>
    </>
  );
}

export default ShelterList
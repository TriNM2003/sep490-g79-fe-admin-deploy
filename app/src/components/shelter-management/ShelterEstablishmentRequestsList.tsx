import { DataTable } from '@/components/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ShelterEstablishmentRequestTableData } from '@/types/ShelterEstablishmentRequest';
import type { ShelterTableData } from '@/types/ShelterTableData';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Link, Loader2Icon, NotepadTextDashed } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { toast } from 'sonner';

const examplePhoto = "https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg";

const shelterRequestsExample: ShelterEstablishmentRequestTableData[] = [
  {
    index: 1,
    avatar: examplePhoto,
    name: "Blue Haven Shelter",
    email: "contact@bluehaven.vn",
    hotline: 123456789,
    address: "12 Pham Van Dong, Ha Noi",
    shelterLicenseURL: examplePhoto,
    createdAt: new Date("2025-06-01T08:30:00"),
    updateAt: new Date("2025-06-15T10:00:00"),
  },
  {
    index: 2,
    avatar: "https://example.com/avatar2.jpg",
    name: "Peaceful Paws",
    email: "info@peacefulpaws.org",
    hotline: 987654321,
    address: "45 Tran Phu, Da Nang",
    shelterLicenseURL: "https://example.com/licenses/peacefulpaws.pdf",
    createdAt: new Date("2025-05-20T14:10:00"),
    updateAt: new Date("2025-06-05T09:15:00"),
  },
  {
    index: 3,
    avatar: "https://example.com/avatar3.jpg",
    name: "Love Animals Shelter",
    email: "love@animalshelter.vn",
    hotline: 112233445,
    address: "78 Nguyen Trai, Ho Chi Minh City",
    shelterLicenseURL: "https://example.com/licenses/loveanimals.pdf",
    createdAt: new Date("2025-06-10T11:45:00"),
    updateAt: new Date("2025-06-18T13:00:00"),
  },
  {
    index: 4,
    avatar: "https://example.com/avatar4.jpg",
    name: "Pet Care Center",
    email: "support@petcare.vn",
    hotline: 556677889,
    address: "98 Hai Ba Trung, Hue",
    shelterLicenseURL: "https://example.com/licenses/petcarecenter.pdf",
    createdAt: new Date("2025-06-12T16:20:00"),
    updateAt: new Date("2025-06-19T18:10:00"),
  },
  {
    index: 5,
    avatar: "https://example.com/avatar5.jpg",
    name: "Home for Paws",
    email: "team@homeforpaws.org",
    hotline: 334455667,
    address: "31 Ly Thai To, Can Tho",
    shelterLicenseURL: "https://example.com/licenses/homeforpaws.pdf",
    createdAt: new Date("2025-06-05T07:00:00"),
    updateAt: new Date("2025-06-20T08:25:00"),
  },
];


const ShelterEstablishmentRequestsList = () => {
    const [shelterRequestData, setShelterRequestData] = useState<ShelterEstablishmentRequestTableData[]>([]);
    const [filteredShelterRequestData, setFilteredShelterRequestData] = useState<ShelterEstablishmentRequestTableData[]>([]);
    const [selectedShelterRequest, setSelectedShelterRequest] = useState<ShelterEstablishmentRequestTableData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<Boolean>(false);
    
        useEffect(() => {
            setShelterRequestData(shelterRequestsExample);
            setFilteredShelterRequestData(shelterRequestsExample);
        }, [])
    
    
        const columns: ColumnDef<ShelterEstablishmentRequestTableData>[] = [
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
          cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString("vi-vn"),
        },
        {
                id: "actions",
                cell: ({ row }) => 
          <Button className="cursor-pointer" onClick={() => {
            setSelectedShelterRequest({
              index: row.original.index,
              avatar: row.original.avatar,
              name: row.original.name,
              email: row.original.email,
              hotline: row.original.hotline,
              address: row.original.address,
              shelterLicenseURL: row.original.shelterLicenseURL,
              createdAt: row.original.createdAt,
              updateAt: row.original.updateAt,
            });
            setIsDialogOpen(true)
          }}>
            <NotepadTextDashed /> Duyệt
          </Button>
            },
      ];
    
      function searchShelterByNameEmailHotlineAddress(
        shelterData: ShelterEstablishmentRequestTableData[],
        keyword: string
      ) {
        const trimmedKeyword = keyword.trim().toLowerCase();
    
        // Nếu keyword rỗng thì trả về toàn bộ danh sách ban đầu
        if (trimmedKeyword === "") {
          setFilteredShelterRequestData(shelterData);
          return;
        }
    
        const result: ShelterEstablishmentRequestTableData[] = shelterData.filter((shelter) => {
          return (
            shelter.name.toLowerCase().includes(trimmedKeyword) ||
            shelter.email.toLowerCase().includes(trimmedKeyword) ||
            shelter.address.toLowerCase().includes(trimmedKeyword) ||
            shelter.hotline.toString().includes(trimmedKeyword)
          );
        });
        setFilteredShelterRequestData(result);
      }

      async function handleApprove(){
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false)
            setSelectedShelterRequest(null);
            setIsDialogOpen(false)
            toast.success("Duyệt chấp thuận thành công!")
        }, 2000);
      }

      async function handleReject(){
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false)
            setSelectedShelterRequest(null);
            setIsDialogOpen(false)
            toast.success("Duyệt từ chối thành công!")
        }, 2000);
      }

  return (
    <>
      <div className="col-span-12 px-5 flex flex-col gap-5">
        <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
          Danh sách yêu cầu thành lập trạm cứu hộ
        </h4>
        <Input
          type="string"
          placeholder="Tìm kiếm theo tên, email, hotline hoặc địa chỉ"
          className="max-w-1/3"
          onChange={(e) =>
            searchShelterByNameEmailHotlineAddress(
              shelterRequestsExample,
              e.target.value
            )
          }
        />
      </div>
      <div className="col-span-12 px-5 mt-2">
        <DataTable columns={columns} data={filteredShelterRequestData ?? []} />
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent className="max-w-[70vw]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu thành lập trạm cứu hộ</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-3">
            <div className="flex flex-row">
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1 h-fit">
                Ảnh đại diện trạm cứu hộ
              </span>
              <span className="ms-1">
                {selectedShelterRequest !== null && (
                  <PhotoView src={selectedShelterRequest.avatar}>
                    <img
                      src={selectedShelterRequest.avatar}
                      alt="shelterAvatar"
                      className="w-16 h-16 rounded-sm object-cover cursor-pointer"
                    />
                  </PhotoView>
                )}
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Tên trạm cứu hộ
              </span>
              <span className="ms-1">
                {selectedShelterRequest !== null
                  ? selectedShelterRequest.name
                  : "No data"}
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Email
              </span>
              <span className="ms-1">
                {selectedShelterRequest !== null
                  ? selectedShelterRequest.email
                  : "No data"}
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Hotline
              </span>
              <span className="ms-1">
                {selectedShelterRequest !== null
                  ? selectedShelterRequest.hotline
                  : "No data"}
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Địa chỉ
              </span>
              <span className="ms-1">
                {selectedShelterRequest !== null
                  ? selectedShelterRequest.address
                  : "No data"}
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Giấy phép hoạt động
              </span>
              <span className="ms-1">
                <a
                  href={
                    selectedShelterRequest !== null
                      ? selectedShelterRequest.shelterLicenseURL
                      : "No data"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Xem tài liệu
                </a>
              </span>
            </div>
            <div>
              <span className="font-medium border-2 border-solid rounded-lg border-muted-foreground px-2 py-1">
                Ngày tạo
              </span>
              <span className="ms-1">
                {new Date(
                  selectedShelterRequest !== null
                    ? selectedShelterRequest.createdAt
                    : "No data"
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              {buttonLoading ? (
                <Button disabled>
                  <Loader2Icon className="animate-spin" />
                  Vui lòng chờ
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Đóng
                </Button>
              )}
            </DialogClose>
            {buttonLoading ? (
              <Button variant="destructive" disabled>
                <Loader2Icon className="animate-spin" />
                Vui lòng chờ
              </Button>
            ) : (
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => handleReject()}
              >
                Từ chối
              </Button>
            )}
            {buttonLoading ? (
              <Button disabled>
                <Loader2Icon className="animate-spin" />
                Vui lòng chờ
              </Button>
            ) : (
              <Button onClick={() => handleApprove()}>Chấp thuận</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShelterEstablishmentRequestsList
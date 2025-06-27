
import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppContext from '@/context/AppContext'
import type { UserTableData } from '@/types/UserTableData'
import useAuthAxios from '@/utils/authAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Label } from '@radix-ui/react-dropdown-menu'
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import { ArrowUpDown, Ban, ChevronsUpDown, MoreHorizontal, RotateCcwKey, Users } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


const addUserSchema = z
  .object({
    fullName: z
    .string()
    .trim()
    .min(6, "Họ và tên quá ngắn")
    .regex(/^[\p{L}\s-]+$/u,"Tên chỉ được chứa chữ cái, khoảng trắng và dấu gạch nối"
    )
    .refine(
      (val) => (val.match(/\p{L}/gu) || []).length >= 3,
      "Tên phải có ít nhất 3 chữ cái"
    ),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
    roles: z.array(z.string()).min(1, "Vui lòng chọn vai trò"),
  })

const UserManagement = () => {
    const [userData, setUserData] = useState<UserTableData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserTableData[]>([]);
    const {userAPI, coreAPI} = useContext(AppContext);
    const authAxios = useAuthAxios();

        const form = useForm<z.infer<typeof addUserSchema>>({
          resolver: zodResolver(addUserSchema),
          defaultValues: {
            fullName: "",
            email: "",
            password: "",
            roles: [],
          },
        });

    useEffect(() => {
      authAxios.get(`${userAPI}/get-users-list`)
      .then(function({data}){
        console.log(data)
        setUserData(data.usersList)
        setFilteredUsers(data.usersList)
      })
      .catch(function(error){
        console.log(error?.response?.data.message)
      })
    }, [])

    
    const handleAddUser = async ({
      fullName,
      email,
      password,
      roles,
    }: z.infer<typeof addUserSchema>) => {
      try {
        console.log("add user");
        console.log(fullName, email, password, roles);
        const response = await authAxios.post(`${coreAPI}/admin/add-user`, {
          fullName,
          email,
          password,
          roles,
        });
        console.log(response?.data.message);
        setTimeout(() => {
          toast.success("Tạo người dùng mới thành công!")
          authAxios
            .get(`${userAPI}/get-users-list`)
            .then(function ({ data }) {
              console.log(data);
              setUserData(data.usersList);
              setFilteredUsers(data.usersList);
            })
            .catch(function (error) {
              console.log(error?.response?.data.message);
            });
        }, 1000)
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

    const handleBanUser = async (userId : string) => {
      try {
        await authAxios.put(`${coreAPI}/admin/ban-user/${userId}`);
        toast.success("Ban người dùng thành công!")
        authAxios.get(`${userAPI}/get-users-list`)
      .then(function({data}){
        console.log(data)
        setUserData(data.usersList)
        setFilteredUsers(data.usersList)
      })
      .catch(function(error){
        console.log(error?.response?.data.message)
      })
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

    const handleUnbanUser = async (userId : string) => {
      try {
        await authAxios.put(`${coreAPI}/admin/unban-user/${userId}`);
        toast.success("Unban người dùng thành công!")

        authAxios.get(`${userAPI}/get-users-list`)
      .then(function({data}){
        console.log(data)
        setUserData(data.usersList)
        setFilteredUsers(data.usersList)
      })
      .catch(function(error){
        console.log(error?.response?.data.message)
      })
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

    const handleChangeUserRole = async (userId : string, roles: string[]) => {
      try {
        console.log("change user role");
        console.log(userId, roles);

        if(roles.length === 0){
          toast.error("Người dùng phải có ít nhất 1 vai trò")
        }
    
        const response = await authAxios.put(`${coreAPI}/admin/change-roles/${userId}`, {roles});
        console.log(response?.data.message);
        toast.success("Thay đổi vai trò người dùng thành công!")
        authAxios.get(`${userAPI}/get-users-list`)
      .then(function({data}){
        console.log(data)
        setUserData(data.usersList)
        setFilteredUsers(data.usersList)
      })
      .catch(function(error){
        console.log(error?.response?.data.message)
      })
      } catch (error: any) {
        console.log(error?.response.data.message);
      }
    };

    const columns: ColumnDef<UserTableData>[] = [
      {
        header: "STT",
        cell: ({ row }) => <p className='text-center'>{row.index + 1}</p>
      },
      {
        accessorKey: "avatar",
        header: "Ảnh đại diện",
        cell: ({ row }) => (
          <img
            src={row.original.avatar}
            alt={row.original.fullName}
            className="h-10 w-10 rounded-full object-cover mx-auto"
          />
        ),
      },
      {
        accessorKey: "fullName",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="cursor-pointer"
            >
              Họ và tên
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({row}) => {
          return <span className='px-2'>{row.original.fullName}</span>
        }
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="cursor-pointer"
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({row}) => {
          return <span className='px-2'>{row.original.email}</span>
        }
      },
      {
        accessorKey: "roles",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="cursor-pointer"
            >
              Vai trò
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const [selectedRoles, setSelectedRoles] = useState<string[]>(row.original.roles)
          const handleToggleRole = (role: string) => {
      setSelectedRoles(prev =>
        prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
      )
    }

        if(row.original.status === "banned"){
          return row.original.roles.map((role) => (
              <Badge key={role} variant="default">
                {role === "user" ? "Người dùng" : "Quản trị viên"}
              </Badge>
            ))
        }

          return <Dialog onOpenChange={(open) => {
            if(!open){
              setSelectedRoles(row.original.roles);
            }
          }}>
        <DialogTrigger asChild>
          <div className="flex flex-row gap-2 cursor-pointer">
            {row.original.roles.map((role) => (
              <Badge key={role} variant="default">
                {role === "user" ? "Người dùng" : "Quản trị viên"}
              </Badge>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Thay đổi vai trò</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <div className='flex flex-row gap-2'>
                <Avatar>
                  <AvatarImage
                    src={row.original?.avatar}
                  ></AvatarImage>
                </Avatar>
                <span className="my-auto">
                  {row.original?.fullName}
                </span>
              </div>
              {["user", "admin"].map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleToggleRole(role)}
                  />
                  <span>{role === "user" ? "Người dùng" : "Quản trị viên"}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end flex-row gap-2">
              <DialogClose asChild>
                <Button variant="secondary" className='cursor-pointer'>Đóng</Button>
              </DialogClose>
              <Button onClick={e => handleChangeUserRole(row.original._id, selectedRoles)} className='cursor-pointer'>Thay đổi</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
        }
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
          const status = row.original.status;
          let color = "";
          let statusTiengViet = "";
          if (status === "active") {
            statusTiengViet = "Đã kích hoạt";
            color = "text-green-500 font-semibold uppercase";
            return <Badge variant="default">{statusTiengViet}</Badge>
          } else if(status === "verifying"){
            statusTiengViet = "Chờ kích hoạt";
            color = "text-yellow-500 font-semibold uppercase";
            return <Badge variant="secondary">{statusTiengViet}</Badge>
          }else{
            statusTiengViet = "Bị cấm";
            color = "text-destructive font-semibold uppercase";
            return <Badge variant="destructive">{statusTiengViet}</Badge>
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
        cell: ({ row }) =>
          <span className='px-2'>{new Date(row.original.createdAt).toLocaleDateString("vi-VN")}</span>
      },
      {
        id: "actions",
        cell: ({ row }) => (
          row.original.roles.includes("admin") ? "" :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              sideOffset={0}
              className="w-40 rounded-md border bg-background shadow-lg p-1"
            >
              {row.original.status !== "banned" &&
              <DropdownMenuItem
                onClick={() => {
                  handleBanUser(row.original._id);
                }}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              >
                
                <Ban className="w-4 h-4"/> Ban
              </DropdownMenuItem>
              }
              {row.original.status === "banned" && 
              <DropdownMenuItem
                onClick={() => {
                  handleUnbanUser(row.original._id);
                }}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              >
                <RotateCcwKey className="w-4 h-4"/> Unban
              </DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];

  function searchUsersByFullnameOrEmail(
    users: UserTableData[],
    keyword: string
  ) {
    if (keyword.trim() === "") {
      setFilteredUsers(userData);
    }
    const lowerKeyword = keyword.toLowerCase().trim();
    const result: UserTableData[] = users.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(lowerKeyword) ||
        user.email.toLowerCase().includes(lowerKeyword)
      );
    });
    // console.log(result);
    setFilteredUsers(result);
  }


  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb className="container mb-3 py-1 px-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Quản lý người dùng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách người dùng
          </h4>
          <div className="flex flex-row gap-7">
            <Input
              className="max-w-1/3"
              type="string"
              placeholder="Tìm kiếm theo tên hoặc email"
              onChange={(e) =>
                searchUsersByFullnameOrEmail(userData, e.target.value)
              }
            />
            <Dialog
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  form.reset(); // reset mỗi khi Dialog đóng
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  <Users /> Thêm tài khoản
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddUser)}>
                    <DialogHeader>
                      <DialogTitle>Thêm tài khoản</DialogTitle>
                      <DialogDescription>
                        Tạo thêm tài khoản hệ thống mới.
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Họ và tên<span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nguyễn Văn A" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Email<span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="nguyenvana@gmail.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Mật khẩu<span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="roles"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Vai trò<span className="text-destructive">*</span>
                          </FormLabel>
                          <div className="flex flex-col space-y-2">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="user"
                                  checked={field.value?.includes("user")}
                                  onCheckedChange={(checked) => {
                                    const isChecked = checked === true;
                                    if (isChecked) {
                                      field.onChange([...field.value, "user"]);
                                    } else {
                                      field.onChange(
                                        field.value.filter((v) => v !== "user")
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel htmlFor="user">
                                Người dùng thông thường
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="admin"
                                  checked={field.value?.includes("admin")}
                                  onCheckedChange={(checked) => {
                                    const isChecked = checked === true;
                                    if (isChecked) {
                                      field.onChange([...field.value, "admin"]);
                                    } else {
                                      field.onChange(
                                        field.value.filter((v) => v !== "admin")
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel htmlFor="admin">
                                Quản trị viên
                              </FormLabel>
                            </FormItem>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Đóng
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="cursor-pointer">
                        Thêm người dùng
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="col-span-12 px-5">
          <DataTable columns={columns} data={filteredUsers ?? []} />
        </div>
      </div>
    </div>
  );
}

export default UserManagement
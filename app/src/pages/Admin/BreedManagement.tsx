import { DataTable } from '@/components/data-table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppContext from '@/context/AppContext';
import type { Breed } from '@/types/Breed';
import type { DonationTableData } from '@/types/DonationTableData';
import { type Species } from '@/types/Species';
import type { User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Bone, Crown, MoreHorizontal, NotebookText, Trash } from 'lucide-react';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const breedSchema = z.object({
    speciesId: z.string().min(1, "Vui lòng chọn loài!"),
    name: z.string().min(1, "Tên giống không được để trống !").max(20, "Tên giống không được quá 20 kí tự !"),
    description: z.string().min(1, "Tên giống không được để trống !").max(20, "Tên giống không được quá 20 kí tự !")
  })

const BreedManagement = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);
    const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>([]);
    const [search, setSearch] = useState<string>("");
    const authAxios = useAuthAxios();
    const {breedAPI, speciesAPI} = useContext(AppContext);
    const [refresh, setRefresh] = useState<boolean>(false);

    const form = useForm<z.infer<typeof breedSchema>>({
      resolver: zodResolver(breedSchema),
      defaultValues: {
        speciesId: "",
        name: "",
        description: "",
      },
    });

      useEffect(() => {
        authAxios.get(`${breedAPI}/get-all`)
        .then(({data}) => {
            setBreeds(data);
            setFilteredBreeds(data)
        }) 
        .catch((err) => console.log(err?.response.data.message))

        authAxios.get(`${speciesAPI}/get-all`)
        .then(({data}) => {
            setSpecies(data);
        }) 
        .catch((err) => console.log(err?.response.data.message))
      }, [refresh])

      useEffect(() => {
        if (search.trim().length < 1) {
          setFilteredBreeds(breeds);
        } else {
          const searchedBreeds = breeds.filter((breed) => {
            if (
              breed.name.toLocaleLowerCase().includes(search.toLowerCase()) ||
              breed.description.toLowerCase().includes(search.toLowerCase())
            ) {
              return breed;
            }
          });
          setFilteredBreeds(searchedBreeds);
        }
      }, [search]);


      const handleCreate = async (values: z.infer<typeof breedSchema>) => {
        try {
            const {speciesId, name, description} = values;
            await authAxios.post(`${breedAPI}/create`, {
                speciesId: speciesId,
                name,
                description
            })

            toast.success("Tạo thêm giống thành công!")
            setRefresh(prev => !prev)
        } catch (error : any) {
            toast.error(error?.response.data.message)
        }
      }
      const handleDelete = async (breedId: string) => {
        try {
            await authAxios.delete(`${breedAPI}/delete/${breedId}`)

            toast.success("Xóa giống thành công!")
            setRefresh(prev => !prev)
        } catch (error : any) {
            toast.error(error?.response.data.message)
        }
      }

      const columns: ColumnDef<Breed>[] = [
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
          accessorKey: "species",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Thuộc loài
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => row.original?.species.name,
        },
        {
          accessorKey: "name",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Tên giống
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => row.original?.name,
        },
        {
          accessorKey: "description",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="cursor-pointer"
              >
                Miêu tả
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return (
              <p className="max-w-[10vw] overflow-hidden text-ellipsis">
                {row.original.description}
              </p>
            );
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
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded">
                    <NotebookText className="w-4 h-4" /> Xem thông tin chi tiết
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => handleDelete(row.original._id)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
                      >
                        <Trash className="w-4 h-4" /> Xóa giống
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Xác nhận xóa giống ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Khi xóa giống này khỏi hệ thống, các thú cưng thuộc
                          giống này sẽ ...
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction>Xác nhận xóa</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

      
  return (
    <div className="flex flex-1 flex-col px-20 py-10">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 flex flex-col gap-5">
          <h4 className="scroll-m-20 min-w-40 text-xl font-semibold tracking-tight text-center">
            Danh sách giống thú cưng
          </h4>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm..."
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
                  <Bone /> Thêm giống mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreate)}>
                    <DialogHeader>
                      <DialogTitle>Thêm giống mới</DialogTitle>
                      <DialogDescription>
                        Tạo thêm giống mới cho thú cưng.
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={form.control}
                      name="speciesId"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Loài<span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Loài" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Tên giống<span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Fox sóc" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Miêu tả giống
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Miêu tả giống" />
                          </FormControl>
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
                        Thêm giống
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={filteredBreeds ?? []} />
        </div>
      </div>
    </div>
  );
}

export default BreedManagement
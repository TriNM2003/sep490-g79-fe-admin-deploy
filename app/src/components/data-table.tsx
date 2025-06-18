"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    top: "1",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  },
  {
    top: "2",
    shelterName: "ABC123",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvanb@gmail.com",
    shelterStatus: "Ngừng hoạt động",
  },
  {
    top: "3",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  },
  {
    top: "4",
    shelterName: "ABC123",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvanb@gmail.com",
    shelterStatus: "Ngừng hoạt động",
  }
  ,
  {
    top: "5",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  },
  {
    top: "6",
    shelterName: "ABC123",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvanb@gmail.com",
    shelterStatus: "Ngừng hoạt động",
  }
  ,
  {
    top: "7",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  },
  {
    top: "8",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  },
  {
    top: "9",
    shelterName: "ABC123",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvanb@gmail.com",
    shelterStatus: "Ngừng hoạt động",
  }
  ,
  {
    top: "10",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  }
  ,
  {
    top: "11",
    shelterName: "ABC",
    shelterPetCount: 300,
    shelterPetOwnerCount: 178,
    shelterManager: "nguyenvana@gmail.com",
    shelterStatus: "Hoạt động",
  }
]

export type Payment = {
  top: string
  shelterName: string
  shelterPetCount: number
  shelterPetOwnerCount: number
  shelterManager: string
  shelterStatus: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ms-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    {
    accessorKey: "shelterName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Tên trạm cứu hộ
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("shelterName")}</div>,
  },
  {
    accessorKey: "shelterPetCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Số lượng thú cưng
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("shelterPetCount")}</div>,
  },
  {
    accessorKey: "shelterPetOwnerCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Số lượng thú cưng đã có chủ
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("shelterPetOwnerCount")}</div>,
  },
  {
    accessorKey: "shelterManager",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Quản lý trạm cứu hộ
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("shelterManager")}</div>,
  },
    {
    accessorKey: "shelterStatus",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Trạng thái
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className={row.getValue("shelterStatus") === "Hoạt động" ? "text-green-500" : "text-destructive"}>{row.getValue("shelterStatus")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.top)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm theo tên..."
          value={(table.getColumn("shelterName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("shelterName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} hàng đang chọn.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

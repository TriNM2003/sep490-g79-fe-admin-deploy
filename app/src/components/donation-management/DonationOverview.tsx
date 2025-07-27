import { DataTable } from '@/components/data-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartBarLabelCustom } from '@/components/ui/chart-bar-label-custom';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppContext from '@/context/AppContext';
import type { DonationTableData } from '@/types/DonationTableData';
import type { Donor, User } from '@/types/User';
import useAuthAxios from '@/utils/authAxios';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Crown, MoreHorizontal, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useMemo, useState } from 'react'

// const rankColors = ["text-yellow-400", "text-sky-400", "text-green-400"];

type dialogDetail = {
  isOpen: boolean;
  detail: {
    donor?: Donor | null;
    amount: number,
    message: string,
    createdAt: Date,
    updatedAt: Date,
  };
};

type summaryDialogDetail = {
  isOpen: boolean;
  detail: {
    donor?: Donor | null;
    amount: number,
    createdAt: Date,
    updatedAt: Date,
  };
};

type DonationSummary = {
  _id: string; 
  donor?: Donor | null;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

const DonationOverview = () => {
        const [filteredDonations, setFilteredDonations] = useState<DonationTableData[]>([]);
      const [monthlyDonations, setMonthlyDonations] = useState<
        {
          month: string;
          amount: number;
        }[]
      >([]);
      const {donationAPI} = useContext(AppContext);
      const authAxios = useAuthAxios();
      const [donationRefresh, setDonationRefresh] = useState<boolean>(false);



      useEffect(() => {
        authAxios.get(`${donationAPI}/get-all-donations`)
        .then(({data}) => {
          setFilteredDonations(data)
        })
        .catch((err:any) => {
          console.log(err?.response.data.message)
        })
        
        authAxios.get(`${donationAPI}/get-monthly-donations`)
        .then(({data}) => {
          setMonthlyDonations(data)
        })
        .catch((err:any) => {
          console.log(err?.response.data.message)
        })
      }, [donationRefresh])

      const totalDonationAmount = useMemo(() => {
        return filteredDonations.reduce((acc, current) => acc += current.amount, 0);
      }, [filteredDonations])
    

  return (
    <div className="flex flex-1 flex-col px-20">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="col-span-12 px-5 mt-3 flex flex-col gap-2">
          <Badge className='w-full text-2xl' variant="secondary">
            Tổng quyên góp
            <span className="ms-2 text-green-500">
              {totalDonationAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </Badge>
          <ChartBarLabelCustom donationData={monthlyDonations}/>
        </div>
    </div>
    </div>
  );
}

export default DonationOverview
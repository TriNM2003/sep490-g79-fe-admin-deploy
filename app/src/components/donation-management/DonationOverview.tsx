
import { Badge } from '@/components/ui/badge';
import { ChartBarLabelCustom } from '@/components/ui/chart-bar-label-custom';
import AppContext from '@/context/AppContext';
import type { DonationTableData } from '@/types/DonationTableData';
import useAuthAxios from '@/utils/authAxios';
import  { useContext, useEffect, useMemo, useState } from 'react'

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
      // const [donationRefresh, setDonationRefresh] = useState<boolean>(false);



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
      }, [])

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
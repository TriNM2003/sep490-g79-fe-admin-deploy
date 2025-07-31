import {lazy, Suspense, type JSX, type LazyExoticComponent} from 'react';
const ChartAreaInteractive = lazy(() => import('@/components/chart-area-interactive'));
import { SectionCardContainer } from '@/components/section-card-container';
import { SectionCard} from '@/components/section-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Bone, BoneIcon, BookOpenTextIcon, BookTextIcon, Cat, CatIcon, DogIcon, FlagIcon, HouseIcon, Users, UsersIcon } from 'lucide-react';
import { IconMoneybag } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import type dashboardSectionCard from '@/types/DashboardSectionCard';
import useAuthAxios from '@/utils/authAxios';
import AppContext from '@/context/AppContext';
import { Skeleton } from '@/components/ui/skeleton';
type ChartItem = {
  month: string
  amount: number
}

const AdminDashboard = () => {
  const [dashboardSectionCards, setDashboardSectionCards] = useState<dashboardSectionCard[]>([]);
  const authAxios = useAuthAxios();
  const {shelterAPI} = useContext(AppContext);
  const currentYear = new Date().getFullYear();
  const yearsArray = [currentYear, currentYear - 1, currentYear - 2]; // 3 năm đổ lại
  const [selectedYear, setSelectedYear] = useState<string>(yearsArray[0].toString())
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  useEffect(() => {
    authAxios.get(`${shelterAPI}/get-overview-statistics/${selectedYear}`)
    .then(({data: {overviewStatistics}}) => {
      // console.log(overviewStatistics)
      setDashboardSectionCards([
        {
          title: "Tổng số trạm cứu hộ",
          icon: <HouseIcon />,
          number: overviewStatistics?.shelter,
        },
        {
          title: "Tổng số người dùng",
          icon: <UsersIcon />,
          number: overviewStatistics?.user,
        },
        {
          title: "Tổng số loài",
          icon: <CatIcon />,
          number:  overviewStatistics?.species,
        },
        {
          title: "Tổng số giống",
          icon: <BoneIcon />,
          number: overviewStatistics?.breed,
        },
        {
          title: "Số thú nuôi đã được giải cứu",
          icon: <DogIcon />,
          number: overviewStatistics?.pet.rescuedPets,
        },
        {
          title: "Số thú nuôi đã được nhận nuôi",
          icon: <DogIcon />,
          number: overviewStatistics?.pet.adoptedPets,
        },
        {
          title: "Tổng số bài post",
          icon: <BookOpenTextIcon />,
          number: overviewStatistics?.post,
        },
        {
          title: "Tổng số bài blog",
          icon: <BookTextIcon />,
          number: overviewStatistics?.blog,
        },
        {
          title: "Tổng số báo cáo",
          icon: <FlagIcon />,
          number: overviewStatistics?.report,
        },
        {
          title: "Tổng số đóng góp (VND)",
          icon: <IconMoneybag />,
          number: overviewStatistics?.donation,
        },
      ]);
      setChartData(overviewStatistics.chartData);
    })
    .catch(err => console.log(err?.response.data.message))
  }, [selectedYear])

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 py-10">
      <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6">
        <SectionCardContainer>
          {dashboardSectionCards
            ? dashboardSectionCards.map((stat, index) => (
                <SectionCard
                  key={index}
                  icon={stat.icon}
                  title={stat.title}
                  number={stat.number}
                />
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
        </SectionCardContainer>
        <div className="px-4 lg:px-6">
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <ChartAreaInteractive
              chartData={chartData}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              yearsArray={yearsArray}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
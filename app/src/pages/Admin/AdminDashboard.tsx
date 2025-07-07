import {lazy, Suspense, type JSX, type LazyExoticComponent} from 'react';
const ChartAreaInteractive = lazy(() => import('@/components/chart-area-interactive'));
import { SectionCardContainer } from '@/components/section-card-container';
import { SectionCard} from '@/components/section-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Bone, BookOpenTextIcon, BookTextIcon, Cat, CatIcon, DogIcon, FlagIcon, HouseIcon, Users, UsersIcon } from 'lucide-react';
import { IconMoneybag } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import type dashboardSectionCard from '@/types/DashboardSectionCard';
import useAuthAxios from '@/utils/authAxios';
import AppContext from '@/context/AppContext';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const [dashboardSectionCards, setDashboardSectionCards] = useState<dashboardSectionCard[]>([]);
  const authAxios = useAuthAxios();
  const {shelterAPI} = useContext(AppContext);

  useEffect(() => {
    authAxios.get(`${shelterAPI}/get-overview-statistics`)
    .then(({data: {overviewStatistics}}) => {
      // console.log(overviewStatistics)
      setDashboardSectionCards([
        {
          title: "Tổng số trạm cứu hộ",
          icon: <HouseIcon />,
          number: overviewStatistics?.shelter.totalShelters,
          changePercentage:  overviewStatistics?.shelter.shelterChangePercent,
          isHigher: true,
        },
        {
          title: "Tổng số người dùng",
          icon: <UsersIcon />,
          number: overviewStatistics?.user.totalUsers,
          changePercentage: overviewStatistics?.user.userChangePercent,
          isHigher: true,
        },
        {
          title: "Số thú nuôi đã được giải cứu",
          icon: <DogIcon />,
          number: overviewStatistics?.pet.rescuedPets.current,
          changePercentage: overviewStatistics?.pet.rescuedPets.changePercent,
          isHigher: true,
        },
        {
          title: "Số thú nuôi đã được nhận nuôi",
          icon: <DogIcon />,
          number: overviewStatistics?.pet.adoptedPets.current,
          changePercentage: overviewStatistics?.pet.adoptedPets.changePercent,
          isHigher: true,
        },
        {
          title: "Tổng số bài post",
          icon: <BookOpenTextIcon />,
          number: overviewStatistics?.post.totalPosts,
          changePercentage: overviewStatistics?.post.totalPostsChangePercent,
          isHigher: true,
        },
        {
          title: "Tổng số bài blog",
          icon: <BookTextIcon />,
          number: overviewStatistics?.blog.totalBlogs,
          changePercentage: overviewStatistics?.blog.totalBlogsChangePercent,
          isHigher: true,
        },
        {
          title: "Tổng số báo cáo",
          icon: <FlagIcon />,
          number: overviewStatistics?.report.totalReports,
          changePercentage: overviewStatistics?.report.totalReportsChangePercent,
          isHigher: false,
        },
        {
          title: "Tổng số đóng góp (VND)",
          icon: <IconMoneybag />,
          number: overviewStatistics?.donation.donationAmount,
          changePercentage: overviewStatistics?.donation.donationAmountChangePercent,
          isHigher: true,
        },
      ]);
    })
    .catch(err => console.log(err?.response.data.message))
  }, [])

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb className="container mb-3 py-1 px-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">
              Dashboad tổng quan
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCardContainer>
            {dashboardSectionCards ? dashboardSectionCards.map((stat, index) => (
              <SectionCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                number={stat.number}
                changePercentage={stat.changePercentage}
                isHigher={stat.isHigher}
              />
            )) :
              Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))
            }
          </SectionCardContainer>
          <div className="px-4 lg:px-6">
            <Suspense fallback={<Skeleton className="h-40 w-full" />}>
              <ChartAreaInteractive />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
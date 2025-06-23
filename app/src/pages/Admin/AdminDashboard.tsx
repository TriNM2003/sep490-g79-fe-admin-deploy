import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCardContainer } from '@/components/section-card-container';
import { SectionCard} from '@/components/section-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Bone, BookOpenTextIcon, BookTextIcon, Cat, CatIcon, DogIcon, FlagIcon, HouseIcon, Users, UsersIcon } from 'lucide-react';
import { IconMoneybag } from '@tabler/icons-react';

const AdminDashboard = () => {
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
            <SectionCard icon={<HouseIcon/>} title='Tổng số trạm cứu hộ' number={20} changePercentage='10%' isHigher={false} />
            <SectionCard icon={<UsersIcon/>} title='Tổng số người dùng' number={900} changePercentage='30%' isHigher={true} />
            <SectionCard icon={<DogIcon/>} title='Số thú nuôi đã được giải cứu' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<DogIcon/>} title='Số thú nuôi đã được nhận nuôi' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<BookOpenTextIcon/>} title='Tổng số bài post' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<BookTextIcon/>} title='Tổng số bài blog' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<FlagIcon/>} title='Tổng số báo cáo' number={10} changePercentage='10%' isHigher={false} />
            <SectionCard icon={<IconMoneybag/>} title='Tổng số đóng góp (VND)' number={2000000} changePercentage='10%' isHigher={true} />
          </SectionCardContainer>
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
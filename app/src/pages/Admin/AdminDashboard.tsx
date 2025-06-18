import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTableDemo } from '@/components/data-table';
import { SectionCardContainer } from '@/components/section-card-container';
import { SectionCard} from '@/components/section-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Bone, BookOpenTextIcon, BookTextIcon, Cat, CatIcon, DogIcon, FlagIcon, HouseIcon, Users, UsersIcon } from 'lucide-react';

const data = [
    {
    "id": 1,
    "header": "Table of contents",
    "type": "Table of contents",
    "status": "Done",
    "target": "29",
    "limit": "24",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 2,
    "header": "Table of contents",
    "type": "Table of contents",
    "status": "Done",
    "target": "29",
    "limit": "24",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 3,
    "header": "Executive summary",
    "type": "Narrative",
    "status": "Done",
    "target": "10",
    "limit": "13",
    "reviewer": "Eddie Lake"
  }
]


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
            <SectionCard icon={<CatIcon/>} title='Tổng số thú nuôi' number={400} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<HouseIcon/>} title='Tổng số trạm cứu hộ' number={20} changePercentage='10%' isHigher={false} />
            <SectionCard icon={<UsersIcon/>} title='Tổng số người dùng' number={900} changePercentage='30%' isHigher={true} />
            <SectionCard icon={<DogIcon/>} title='Số thú nuôi đã được giải cứu' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<DogIcon/>} title='Số thú nuôi đã được nhận nuôi' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<BookOpenTextIcon/>} title='Tổng số bài post' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<BookTextIcon/>} title='Tổng số bài blog' number={600} changePercentage='20%' isHigher={true} />
            <SectionCard icon={<FlagIcon/>} title='Tổng số báo cáo' number={10} changePercentage='10%' isHigher={false} />
          </SectionCardContainer>
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full text-center">Top trạm cứu hộ dựa trên số thú nuôi đã được giải cứu</h4>
          <DataTableDemo />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
import { DataTable } from '@/components/data-table';
import ShelterEstablishmentRequestsList from '@/components/shelter-management/ShelterEstablishmentRequestsList';
import ShelterList from '@/components/shelter-management/ShelterList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ShelterTableData } from '@/types/ShelterTableData';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Link } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const ShelterManagement = () => {
  return (
    <PhotoProvider>
      <div className="flex flex-1 flex-col">
        <Breadcrumb className="container mb-3 py-1 px-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Quản lý trạm cứu hộ</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="@container/main flex flex-1 flex-col gap-2">
          <Tabs defaultValue="shelters">
            <TabsList className="w-[400px]">
              <TabsTrigger value="shelters" className='cursor-pointer'>Tất cả trạm cứu hộ</TabsTrigger>
              <TabsTrigger value="shelterEstablishmentRequests" className='cursor-pointer'>
                Các yêu cầu thành lập trạm cứu hộ
              </TabsTrigger>
            </TabsList>
            <TabsContent value="shelters">
              <ShelterList/>
            </TabsContent>
            <TabsContent value="shelterEstablishmentRequests">
              <ShelterEstablishmentRequestsList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PhotoProvider>
  );
}

export default ShelterManagement
import DonationDetails from '@/components/donation-management/DonationDetails';
import DonationOverview from '@/components/donation-management/DonationOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const DonationManagement = () => {
  return (
    <PhotoProvider>
      <div className="flex flex-1 flex-col">
        <div className="@container/main mt-10">
          <Tabs defaultValue="overview">
            <TabsList className="w-[50vw] mx-auto">
              <TabsTrigger value="overview" className='cursor-pointer'>Tổng quan</TabsTrigger>
              <TabsTrigger value="detail" className='cursor-pointer'>
                Chi tiết
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DonationOverview/>
            </TabsContent>
            <TabsContent value="detail">
              <DonationDetails />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PhotoProvider>
  );
}

export default DonationManagement
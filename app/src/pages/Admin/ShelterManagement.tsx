import ShelterEstablishmentRequestsList from '@/components/shelter-management/ShelterEstablishmentRequestsList';
import ShelterList from '@/components/shelter-management/ShelterList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const ShelterManagement = () => {
  return (
    <PhotoProvider>
      <div className="flex flex-1 flex-col">
        <div className="@container/main mt-10">
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
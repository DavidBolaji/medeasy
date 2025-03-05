import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { helpList } from '@/app/_lib/data';
import React from 'react';

import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import RequestDetails from '@/app/dashboard/help-provider/_components/request-details';
import OfferCard from '@/app/_components/card/offer-card';
import BidingDetails from '@/app/dashboard/account-owner/_components/biding-details';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { UserIcon } from 'lucide-react';
import Typography from '@/app/_components/typography/typography';

interface RenderTabsProps {
  requests: ReturnSingleRequestSchemaType | null;
  biders: RequestBiderSchemaType[] | [];
}

const RenderTabs: React.FC<RenderTabsProps> = ({ requests, biders }) => {
  return (
    <Tabs color="white w-full" defaultValue="details" className="w-full ">
      <TabsList className="w-full rounded-none scrollbar-hide space-x-3 overflow-auto">
        {helpList(requests).map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="border-b-2 border-[#E4E4EF] data-[state=active]:border-b-primary font-instrument font-medium"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="details" className="px-2 mt-4">
        <RequestDetails request={requests} />
      </TabsContent>
      <TabsContent value="offers" className="mt-4">
        <div className="grid lg:grid-cols-6 gap-x-4 pb-20">
          {biders.map((bider, ind) => (
            <div key={ind} className="col-span-2">
              <OfferCard bider={bider} />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="acceptedOffer" className="px-2 mt-4">
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage alt={`@${requests?.acceptedBider?.user.fname}`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <div className="text-nowrap">
            <Typography className="text-sm font-bold text-black underline mt-1">
              {requests?.acceptedBider?.user.fname}{' '}
              {requests?.acceptedBider?.user.lname}
            </Typography>
          </div>
        </div>
        <BidingDetails
          biding={
            {
              ...requests?.acceptedBider,
              request: { service: requests?.service },
            } as unknown as RequestBiderSchemaType
          }
          allowCounter={false}
          job={''}
          show={false}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RenderTabs;

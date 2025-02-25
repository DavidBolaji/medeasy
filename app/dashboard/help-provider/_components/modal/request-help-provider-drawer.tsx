'use client';

import { StyledMobileDrawer } from '@/app/dashboard/account-owner/_components/modal/drawer.style';
import {
  ReturnAllRequestSchemaType,
  ReturnSingleRequestSchemaType,
} from '@/src/entities/models/requests';
import React from 'react';
import useHelpproviderModal from '../../_hooks/use-help-provider-modal';
import { Grid } from 'antd';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { UserIcon } from 'lucide-react';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { tabList } from '@/app/_lib/data';
import RequestDetails from '../request-details';
import RequestProfile from '../request-profile';
import RequestReviews from '../request-reviews';
import RequestOffer from '../request-offer';
const { useBreakpoint } = Grid;

interface RequestHelpProviderModalProps {
  requests: ReturnAllRequestSchemaType[];
}

const RequestHelpProviderDrawer = ({
  requests,
}: RequestHelpProviderModalProps) => {
  const { open, onOpenChange } = useHelpproviderModal();
  const screen = useBreakpoint();
  const selectedRequest =
    requests.find((request) => open?.id === request.id) || null;

  return !screen.lg ? (
    <StyledMobileDrawer
      open={open?.shown}
      onClose={() => onOpenChange('')}
      placement="bottom"
      height={'90%'}
      closeIcon={null}
      width={485}
      footer={
        <div className="px-4 py-6">
          <Button
            onClick={() => onOpenChange('')}
            className="hover:border-none md:w-auto w-full"
            asChild
          >
            <Link href={`/dashboard/help-provider/home/${selectedRequest?.id}`}>
              Make Offer
            </Link>
          </Button>
        </div>
      }
    >
      <div className="md:px-10 px-4 pt-4 flex flex-row items-center justify-between scrollbar-hide">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-20 h-20">
              <AvatarImage alt={`${selectedRequest?.user.fname}`} />
              <AvatarFallback className="bg-[#5C698A]">
                <UserIcon color="white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Typography
                as="p"
                className="text-xs text-left text-[#5C698A] font-normal mb-1"
              >
                Requested by
              </Typography>
              <Typography
                as="p"
                className="font-bold text-black text-xl underline"
              >
                {selectedRequest?.user.fname} {selectedRequest?.user.lname}
              </Typography>
            </div>
          </div>
        </div>
        <div className="md:flex hidden items-center">
          <Button
            variant="outline"
            asChild
            className="h-8"
            onClick={() => onOpenChange('')}
          >
            <Link href={`/dashboard/help-provider/home/${selectedRequest?.id}`}>
              Make Offer
            </Link>
          </Button>
        </div>
      </div>

      <Tabs color="white w-full" defaultValue="details" className="w-full ">
        <TabsList className="md:px-12 px-4 border-b w-full rounded-none scrollbar-hide overflow-auto">
          {tabList.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          value="details"
          className="md:px-12 px-4 h-[280px] overflow-y-scroll scrollbar-hide"
        >
          <RequestDetails
            request={
              selectedRequest as unknown as ReturnSingleRequestSchemaType
            }
          />
        </TabsContent>
        <TabsContent
          value="profile"
          className="md:px-12 px-4 h-[280px] overflow-y-scroll scrollbar-hide"
        >
          <RequestProfile personalDetails={selectedRequest} />
        </TabsContent>
        <TabsContent
          value="reviews"
          className="md:px-12 px-4 h-[280px] overflow-y-scroll scrollbar-hide"
        >
          <RequestReviews requests={selectedRequest} />
        </TabsContent>
        <TabsContent
          value="biding"
          className="md:px-12 px-4 h-[280px] overflow-y-scroll scrollbar-hide"
        >
          <RequestOffer request={selectedRequest} />
        </TabsContent>
      </Tabs>
    </StyledMobileDrawer>
  ) : null;
};

export default RequestHelpProviderDrawer;

'use client';

import { UserIcon } from 'lucide-react';
import useHelpproviderModal from '../../_hooks/use-help-provider-modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import Typography from '@/app/_components/typography/typography';
import {
  ReturnAllRequestSchemaType,
  ReturnSingleRequestSchemaType,
} from '@/src/entities/models/requests';
import RequestDetails from '../request-details';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { tabList } from '@/app/_lib/data';
import RequestProfile from '../request-profile';
import RequestReviews from '../request-reviews';
import Link from 'next/link';
import RequestOffer from '../request-offer';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

interface RequestHelpProviderModalProps {
  requests: ReturnAllRequestSchemaType[];
}

export default function RequestHelpProviderModal({
  requests,
}: RequestHelpProviderModalProps) {
  const { open, onOpenChange } = useHelpproviderModal();
  const screen = useBreakpoint();
  const selectedRequest =
    requests.find((request) => open?.id === request.id) || null;

  return screen.lg ? (
    <Dialog open={open?.shown} onOpenChange={() => onOpenChange('')}>
      <DialogContent className="max-w-5xl h-[600px] max-h-[600px] p-0 bg-white rounded-2xl overflow-hidden">
        <DialogTitle className="hidden">
          help-provider-request-modal
        </DialogTitle>
        <DialogHeader className="md:px-10 px-4 pt-4 flex flex-row items-center justify-between">
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
              <Link
                href={`/dashboard/help-provider/home/${selectedRequest?.id}`}
              >
                Make Offer
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <Tabs color="white w-full" defaultValue="details" className="w-full">
          <TabsList className="md:px-12 px-4 border-b w-full rounded-none ">
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

        <div className="md:px-12 px-4">
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
      </DialogContent>
    </Dialog>
  ) : null;
}

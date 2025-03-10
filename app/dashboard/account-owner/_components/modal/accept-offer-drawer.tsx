'use client';

import { Star, UserIcon, X } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import Typography from '@/app/_components/typography/typography';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { offertabList } from '@/app/_lib/data';

import Link from 'next/link';
import useAcceptOfferModal from '../../_hooks/use-accept-offer-modal';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import { getRating, parseCurrencyToInt } from '@/app/_lib/utils';
import BidingDetails from '../biding-details';
import BidingProfile from '../biding-profile';
import BidingReviews from '../biding-reviews';
import { StyledMobileDrawer } from './drawer.style';
import { Grid } from 'antd';
import { useParams } from 'next/navigation';

const { useBreakpoint } = Grid;

interface AcceptOfferDrawerProps {
  biders: RequestBiderSchemaType[] | [];
  requestPrice: string;
  job: string;
  show?: boolean;
}

export default function AcceptOfferDrawer({
  biders,
  requestPrice,
  job,
  show = true,
}: AcceptOfferDrawerProps) {
  const screen = useBreakpoint();
  const { open, onOpenChange } = useAcceptOfferModal();
  const params = useParams();
  const selectedBider = biders?.find((bider) => open?.id === bider?.id) || null;
  const shouldCounter =
    parseCurrencyToInt(requestPrice) !== selectedBider?.price;

  return !screen.lg ? (
    <StyledMobileDrawer
      open={open?.shown}
      onClose={() => onOpenChange('')}
      placement="bottom"
      height={'90%'}
      closeIcon={null}
      width={485}
      footer={
        show ? (
          <div className="md:px-12 px-4">
            <Button
              onClick={() => onOpenChange(selectedBider?.id || '')}
              className="hover:border-none md:w-auto w-full md:hidden -translate-y-8"
              asChild
            >
              <Link
                href={`/dashboard/account-owner/home/${params.requestId}/${selectedBider?.id}`}
              >
                Accept Offer
              </Link>
            </Button>
          </div>
        ) : null
      }
    >
      <div className="max-w-5xl h-[600px] max-h-[600px] md:hidden p-0 bg-white rounded-2xl overflow-hidden">
        <div className="md:px-10 px-4 pb-0 pt-4 flex flex-row items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Avatar className="w-20 h-20">
                <AvatarImage alt={`${selectedBider?.user.fname}`} />
                <AvatarFallback className="bg-[#5C698A]">
                  <UserIcon color="white" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Typography
                  as="p"
                  className="font-bold text-black text-xl underline"
                >
                  {selectedBider?.user.fname} {selectedBider?.user.lname}
                </Typography>
                <Typography
                  as="p"
                  className="text-xs text-left text-[#5C698A] font-normal mt-1"
                >
                  <span className="flex items-center gap-x-2">
                    <span className="font-bold text-sm">
                      {getRating(selectedBider as RequestBiderSchemaType)}
                    </span>
                    <Star className="fill-[#EAB100] w-4 h-4" color="#EAB100" />
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          {show ? (
            <div className="md:flex hidden items-center">
              <Button
                variant="outline"
                asChild
                className="h-8"
                onClick={() => onOpenChange('')}
              >
                <Link
                  href={`/dashboard/account-owner/home/${params.requestId}/accept`}
                >
                  Accept Offer
                </Link>
              </Button>
            </div>
          ) : null}
        </div>

        <Tabs
          color="white w-full"
          defaultValue="details"
          className="w-full pt-0"
        >
          <TabsList className="md:px-12 px-4 border-b w-full rounded-none ">
            {offertabList.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className="">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="details"
            className="md:px-12 px-4 h-[340px] overflow-y-scroll scrollbar-hide"
          >
            <BidingDetails
              biding={selectedBider as RequestBiderSchemaType}
              allowCounter={shouldCounter}
              job={job}
            />
          </TabsContent>
          <TabsContent
            value="profile"
            className="md:px-12 px-4 h-[340px] overflow-y-scroll scrollbar-hide"
          >
            <BidingProfile bider={selectedBider as RequestBiderSchemaType} />
          </TabsContent>
          <TabsContent
            value="reviews"
            className="md:px-12 px-4 h-[340px] overflow-y-scroll scrollbar-hide"
          >
            <BidingReviews bider={selectedBider as RequestBiderSchemaType} />
          </TabsContent>
        </Tabs>
      </div>
    </StyledMobileDrawer>
  ) : null;
}

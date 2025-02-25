'use client';

import SafeHTML from '@/app/_components/safe-html';
import Typography from '@/app/_components/typography/typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { cn } from '@/app/_lib/utils';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import { Divider } from 'antd';
import { Dot, UserIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

interface RequestDetailsProps {
  request: ReturnSingleRequestSchemaType | null;
  singlePage?: boolean;
  biders?: RequestBiderSchemaType[] | [];
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
  request,
  singlePage = false,
  biders,
}) => {
  const params = useParams();
  const selectedBider =
    biders?.find((bider) => params?.biderId === bider?.id) || null;
  if (!request) {
    return null;
  }
  return (
    <div className="">
      {/* header detail */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm text-[#5C698A] font-instrument">
          Posted {request.createdAt}
        </span>
        <span
          className={cn('inline-block px-4 py-2 bg-[#D6E2FF] rounded-2xl', {
            '-translate-x-10': singlePage,
          })}
        >
          <Typography as="p" className="text-xs text-[#214395]">
            {request?.service}
          </Typography>
        </span>
      </div>

      {/* title */}
      <div>
        <Typography
          as="h4"
          className="text-black text-2xl font-medium mb-2 max-w-[380px]"
        >
          Help Needed: {request?.title}
        </Typography>
      </div>
      {/* sub */}
      <div className="flex flex-wrap md:flex-nowrap text-[#5C698A] font-medium pb-2 md:gap-2">
        <div className="text-sm text-[#5C698A] font-medium">
          Paid: {request?.price} (
          {request?.negotiable ? 'Negotiable' : 'Not negotiable'})
        </div>
        <div className="text-sm flex items-center">
          <Dot className="" />
          {request?.duration}
          <Dot className="" />
        </div>
        <div className="text-sm flex items-center">{request.location}</div>
      </div>
      {/* Requirements */}
      <div className="">
        <SafeHTML content={request?.description as unknown as HTMLElement} />
      </div>
      {!singlePage ? <Divider className="m-0 p-0" /> : null}
      {singlePage ? (
        <div className="flex items-center justify-between pt-8 py-20">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-16 h-16">
              <AvatarImage alt={`${request.user.fname}`} />
              <AvatarFallback className="bg-[#5C698A]">
                <UserIcon color="white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Typography as="p" className="text-xs text-[#5C698A] font-normal">
                Requested by
              </Typography>
              <Typography as="p" className="font-bold text-black underline">
                {request.user.fname} {request.user.lname}
              </Typography>
            </div>
          </div>
        </div>
      ) : null}
      {selectedBider ? (
        <div className="flex items-center justify-between">
          <div className="">
            <div className="flex items-center justify-between gap-x-2">
              <Avatar className="w-12 h-12">
                <AvatarImage alt={`@${selectedBider?.user.fname}`} />
                <AvatarFallback className="bg-[#5C698A]">
                  <UserIcon color="white" />
                </AvatarFallback>
              </Avatar>
              <div className="text-nowrap">
                <Typography className="text-[#5C698A] text-xs font-bold">
                  Help Provider
                </Typography>
                <Typography className="text-sm font-bold text-black underline mt-1">
                  {selectedBider?.user.fname} {selectedBider?.user.lname}
                </Typography>
              </div>
            </div>
          </div>
          {/* <Typography className="text-[#5C698A]">
                  <MessageCircleIcon />
                </Typography> */}
        </div>
      ) : null}
    </div>
  );
};

export default RequestDetails;

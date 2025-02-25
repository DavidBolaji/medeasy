'use client';
import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import React from 'react';
import Typography from '../typography/typography';
import { Dot, UserIcon } from 'lucide-react';
import SafeHTML from '../safe-html';
import { Divider } from 'antd';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ViewRequestCardButton from './view-request-card-button';
import { useRouter, useSearchParams } from 'next/navigation';

interface RequestAllCardProps {
  request: ReturnAllRequestSchemaType;
}

const RequestAllCard: React.FC<RequestAllCardProps> = ({ request }) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('active');
  const router = useRouter();

  const handleViewCompleted = () => {
    router.push(
      `/dashboard/help-provider/home/${request.id}/${request.user.id}`
    );
  };

  const isNew = activeTab === 'new';
  const isCompleted = activeTab === 'completed';
  const onCompletedHandler = isCompleted
    ? () => handleViewCompleted()
    : () => {};
  return (
    <div
      onClick={onCompletedHandler}
      className="bg-[#F1F5F7] rounded-2xl p-6 min-h-[348px]"
    >
      {/* header detail */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm text-[#5C698A] font-instrument">
          Posted {request.createdAt}
        </span>
        <span className="inline-block px-4 py-2 bg-[#D6E2FF] rounded-2xl">
          <Typography as="p" className="text-xs text-[#214395]">
            {request?.service}
          </Typography>
        </span>
      </div>

      {/* title */}
      <div>
        <Typography
          as="h4"
          className="text-black text-2xl font-medium mb-2 max-w-[380px] line-clamp-2"
        >
          Help Needed: {request?.title}
        </Typography>
      </div>
      {/* sub */}
      <div className="flex flex-wrap md:flex-nowrap text-[#5C698A] font-medium pb-2 md:gap-2">
        <div className="text-sm text-[#5C698A] font-medium">
          Paid: {activeTab !== 'new' ? request.finalPrice : request?.price} (
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
      <div className="line-clamp-4">
        <SafeHTML content={request?.description as unknown as HTMLElement} />
      </div>
      <Divider className="m-0 p-0" />
      {isNew ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar>
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
          <ViewRequestCardButton id={request.id} />
        </div>
      ) : null}
    </div>
  );
};

export default RequestAllCard;

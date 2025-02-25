import { ReturnRequestSchemaType } from '@/src/entities/models/requests';
import React from 'react';
import Typography from '../typography/typography';
import { Dot, UserIcon } from 'lucide-react';
import SafeHTML from '../safe-html';
import { Divider } from 'antd';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import useViewOfferModal from '@/app/dashboard/account-owner/_hooks/use-view-offer-modal';
import { useRouter } from 'next/navigation';

interface RequestCardProps {
  request: ReturnRequestSchemaType;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const { onOpenChange } = useViewOfferModal();
  const router = useRouter();

  const handleViewOffer = () => {
    onOpenChange({
      request,
      bider: {
        fname: request?.acceptedBider?.user?.fname || '',
        lname: request?.acceptedBider?.user?.lname || '',
        userId: request?.acceptedBider?.user?.id || '',
      },
      acceptedBiderId: request.acceptedBiderId || '',
      requestId: request.id,
      finalPrice: request.finalPrice,
    });
  };

  const isOngoing = request.stage.toUpperCase() === 'ONGOING';
  const isCompleted = request.stage.toUpperCase() === 'COMPLETED';
  const onGoingHandler = isOngoing
    ? () => handleViewOffer()
    : isCompleted
      ? () =>
          router.push(
            `/dashboard/account-owner/home/${request.id}/user/${request.acceptedBider?.user.id}`
          )
      : () => {};

  return (
    <div
      onClick={onGoingHandler}
      className="bg-[#F1F5F7] rounded-2xl p-6 min-h-[348px]"
    >
      {isCompleted ? (
        <div className="border-b pb-4 mb-4">
          <span className="inline-block border text-sm rounded-full px-4 py-1 border-green-400 text-green-400">
            Completed
          </span>
        </div>
      ) : null}
      {/* header detail */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm text-[#5C698A] font-instrument">
          {request.createdAt}
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
          Paid: {request.stage !== 'NEW' ? request.finalPrice : request?.price}{' '}
          ({request?.negotiable ? 'Negotiable' : 'Not negotiable'})
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

      {request.stage !== 'NEW' ? (
        <div className="flex items-center justify-between">
          <div className="">
            <div className="flex items-center justify-between gap-x-2">
              <Avatar className="w-12 h-12">
                <AvatarImage alt={`@${request?.acceptedBider?.user?.fname}`} />
                <AvatarFallback className="bg-[#5C698A]">
                  <UserIcon color="white" />
                </AvatarFallback>
              </Avatar>
              <div className="text-nowrap">
                <Typography className="text-[#5C698A] text-xs font-bold">
                  Help Provider
                </Typography>
                <Typography className="text-sm font-bold text-black underline mt-1">
                  {request?.acceptedBider?.user?.fname}{' '}
                  {request?.acceptedBider?.user?.lname}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Typography className="text-[#5C698A]">
            {request.biders} {request.biders > 1 ? 'offers' : 'offer'} received
          </Typography>
          <Button variant={'outline'} className="h-10" asChild>
            <Link href={`/dashboard/account-owner/home/${request.id}`}>
              View Offers
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;

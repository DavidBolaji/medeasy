'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import { StarIcon, UserIcon } from 'lucide-react';
import Typography from '../typography/typography';
import SafeHTML from '../safe-html';
import { Button } from '../ui/button';
import { getRating, parseIntToCurrency } from '@/app/_lib/utils';
import { Rate } from 'antd';
import useAcceptOfferModal from '@/app/dashboard/account-owner/_hooks/use-accept-offer-modal';

interface OfferCardProps {
  bider: RequestBiderSchemaType;
}

const OfferCard: React.FC<OfferCardProps> = ({ bider }) => {
  const { onOpenChange } = useAcceptOfferModal();
  const finalRating = getRating(bider);

  return (
    <Card className="rounded-2xl bg-white px-7 py-8 shadow w-full border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage alt={`@${bider.user.fname}`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <div className="text-nowrap">
            <Typography className="text-sm font-bold text-black underline mt-1">
              {bider.user.fname} {bider.user.lname}
            </Typography>
          </div>
        </div>
        <div className="text-xs flex text-nowrap items-center gap-x-2 -translate-x-2">
          <Rate
            character={<StarIcon size={16} />}
            allowHalf
            value={finalRating}
            disabled
          />
          {bider.user.receivedReview.length || 0} reviews
        </div>
      </div>
      <div className="flex items-center justify-between py-4 border-b border-t">
        <Typography className="font-medium text-[#5C698A]">
          Proposed amount
        </Typography>
        <Typography className="font-bold">
          {parseIntToCurrency(bider.price.toString())}
        </Typography>
      </div>
      <div className="mt-4 line-clamp-3 font-instrument">
        <SafeHTML content={bider.pitch as unknown as HTMLElement} />
      </div>
      <div className="">
        <Button
          className="w-auto p-0 m-0 text-primary text-base font-bold font-instrument"
          variant={'link'}
          onClick={() => onOpenChange(bider.id)}
        >
          Read more
        </Button>
      </div>
    </Card>
  );
};

export default OfferCard;

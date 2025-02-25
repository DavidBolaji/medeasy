import SafeHTML from '@/app/_components/safe-html';
import Typography from '@/app/_components/typography/typography';
import { cn, parseIntToCurrency } from '@/app/_lib/utils';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';

import React from 'react';
import CounterForm from './counter-form';

interface BidingDetailsProps {
  biding: RequestBiderSchemaType;
  singlePage?: boolean;
  allowCounter: boolean;
  job: string;
}

const BidingDetails: React.FC<BidingDetailsProps> = ({
  biding,
  singlePage = false,
  allowCounter,
  job,
}) => {
  if (!biding) {
    return null;
  }
  return (
    <div className="">
      {/* header detail */}
      <div className="flex items-center justify-between pb-4">
        <span className="text-sm text-[#5C698A] font-instrument">
          Sent {biding.createdAt.toString()}
        </span>
        <span
          className={cn('inline-block px-4 py-2 bg-[#D6E2FF] rounded-2xl', {
            '-translate-x-10': singlePage,
          })}
        >
          <Typography as="p" className="text-xs text-[#214395]">
            {biding.request.service}
          </Typography>
        </span>
      </div>

      {/* title */}
      <div className="flex items-center border-t border-b py-4 justify-between">
        <Typography as="p" className="text-base font-medium ">
          Proposed amount
        </Typography>
        {allowCounter ? (
          <CounterForm
            price={parseIntToCurrency(biding.price.toString())}
            bidingId={biding.id}
            job={job}
            biderId={biding.user.id}
          />
        ) : (
          <Typography as="h4" className="text-black font-bold ">
            {parseIntToCurrency(biding.price.toString())}
          </Typography>
        )}
      </div>
      {/* sub */}

      {/* Requirements */}
      <div className="mt-4 font-base font-instrument">
        <SafeHTML content={biding?.pitch as unknown as HTMLElement} />
      </div>
    </div>
  );
};

export default BidingDetails;

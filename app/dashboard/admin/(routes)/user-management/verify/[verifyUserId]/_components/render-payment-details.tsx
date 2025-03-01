'use client';

import Typography from '@/app/_components/typography/typography';
import useBank from '@/app/_hooks/use-bank';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';

import React from 'react';

interface RenderPaymentDetailsProps {
  payment: SignUpFiveSchemaType | undefined;
}

const RenderPaymentDetails: React.FC<RenderPaymentDetailsProps> = ({
  payment,
}) => {
  const { getBankName } = useBank();
  return (
    <div>
      <Typography className="font-semibold text-black text-xl mb-4">
        Payment Details
      </Typography>
      <div className="grid grid-cols-6 max-w-xl">
        <div className="col-span-3">
          <Typography className="font-semibold text-base text-[#5C698A] mb-1">
            Bank name
          </Typography>
          <Typography className="font-normal text-black text-base">
            {getBankName(payment?.bank as string)}
          </Typography>
        </div>
        <div className="col-span-3">
          <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
            Bank account
          </Typography>
          <Typography className="font-normal text-black text-base">
            {payment?.actNo}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RenderPaymentDetails;

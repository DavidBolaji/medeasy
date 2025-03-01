import CVCard from '@/app/_components/card/cv-card';
import Typography from '@/app/_components/typography/typography';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { format } from 'date-fns';

import React from 'react';

interface RenderVerificationDetailsProps {
  verification: SignUpFourSchemaType | undefined;
}

const RenderVerificationDetails: React.FC<RenderVerificationDetailsProps> = ({
  verification,
}) => {
  return (
    <div>
      <Typography className="font-semibold text-black text-xl mb-4">
        Identity
      </Typography>
      <div className="space-y-3">
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              Identity type
            </Typography>
            <Typography className="font-normal text-black text-base">
              {verification?.type?.toUpperCase()}
            </Typography>
          </div>
          <div className="col-span-3">
            <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
              ID NO
            </Typography>
            <Typography className="font-normal text-black text-base">
              {verification?.no}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              ID expiry date
            </Typography>
            <Typography className="font-normal text-black text-base">
              {format(verification?.expiry || '', 'PPP')}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-6">
            <Typography className="font-semibold ml-0.5 text-base text-[#5C698A] mb-1">
              ID
            </Typography>
            <CVCard cvUrl={verification?.doc || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderVerificationDetails;

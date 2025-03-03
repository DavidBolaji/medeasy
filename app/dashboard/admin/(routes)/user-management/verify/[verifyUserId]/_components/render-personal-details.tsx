import Typography from '@/app/_components/typography/typography';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { format } from 'date-fns';
import React from 'react';

interface RenderPersonalDetailsProps {
  details: SignUpTwoSchemaType | undefined;
}

const RenderPersonalDetails: React.FC<RenderPersonalDetailsProps> = ({
  details,
}) => {
  return (
    <div className="mt-6">
      <Typography className="font-semibold text-black text-xl mb-4">
        Personal Details
      </Typography>
      <div className="space-y-3">
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              First name
            </Typography>
            <Typography className="font-normal text-black text-base">
              {details?.fname}
            </Typography>
          </div>
          <div className="col-span-3">
            <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
              Last name
            </Typography>
            <Typography className="font-normal text-black text-base">
              {details?.lname}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              Gender
            </Typography>
            <Typography className="font-normal capitalize text-black text-base">
              {details?.gender}
            </Typography>
          </div>
          <div className="col-span-3">
            <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
              Date of birth
            </Typography>
            <Typography className="font-normal text-black text-base">
              {!details?.dob
                ? null
                : format(details?.dob as string, 'd MMMM, yyyy')}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              Language spoken
            </Typography>
            <Typography className="font-normal text-black text-base">
              {details?.language}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderPersonalDetails;

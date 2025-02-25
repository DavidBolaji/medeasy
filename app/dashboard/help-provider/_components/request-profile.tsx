import Typography from '@/app/_components/typography/typography';
import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import React from 'react';

interface RequestProfileProps {
  personalDetails: ReturnAllRequestSchemaType | null;
}

const RequestProfile: React.FC<RequestProfileProps> = ({ personalDetails }) => {
  if (!personalDetails?.user) {
    return null;
  }
  return (
    <div className="space-y-4">
      <Typography as="h4" className="font-bold">
        Personal Details
      </Typography>
      <div>
        <Typography as="h4" className="text-secondary font-semibold">
          Name
        </Typography>
        <Typography as="h5" className="text-[#141923] ">
          {personalDetails?.user.fname} {personalDetails?.user.lname}
        </Typography>
      </div>
      <div>
        <Typography as="h4" className="text-secondary font-semibold">
          Gender
        </Typography>
        <Typography as="h5" className="text-[#141923]">
          {personalDetails?.user.gender}
        </Typography>
      </div>
      <div>
        <Typography as="h4" className="text-secondary font-semibold">
          Language Spoken
        </Typography>
        <Typography as="h5" className="text-[#141923]">
          {personalDetails?.user.language}
        </Typography>
      </div>
      <div>
        <Typography as="h4" className="text-secondary font-semibold">
          Completed Requests
        </Typography>
        <Typography as="h5" className="text-[#141923]">
          {personalDetails.user.completedRequests}
        </Typography>
      </div>
    </div>
  );
};

export default RequestProfile;

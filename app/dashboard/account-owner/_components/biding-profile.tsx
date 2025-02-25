import CVCard from '@/app/_components/card/cv-card';
import Typography from '@/app/_components/typography/typography';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import React from 'react';

interface BidingProfileProps {
  bider: RequestBiderSchemaType;
}

const BidingProfile: React.FC<BidingProfileProps> = ({ bider }) => {
  if (!bider?.user) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div>
        <Typography className="font-semibold mb-2" as="h4">
          Personal Details
        </Typography>
        <div className="flex items-center gap-x-10 flex-wrap">
          <div>
            <Typography as="h4" className="text-[#5C698A] font-semibold mb-1">
              Name
            </Typography>
            <Typography className="text-black">
              {bider.user.fname} {bider.user.lname}
            </Typography>
          </div>
          <div>
            <Typography className="text-[#5C698A] font-semibold mb-1">
              Gender
            </Typography>
            <Typography>{bider.user.gender}</Typography>
          </div>
          <div>
            <Typography className="text-[#5C698A] font-semibold mb-1">
              Language Spoken
            </Typography>
            <Typography>{bider.user.language}</Typography>
          </div>
        </div>
      </div>

      <div>
        <Typography className="font-semibold mb-2" as="h4">
          Services Offered/Experience
        </Typography>
        <div>
          <Typography as="h5" className="text-black mt-2">
            {bider.user.services.map((el) => el?.name).join(',')} (
            {bider.user.services.map((el) => el?.duration).join(',')} year)
          </Typography>
        </div>
      </div>

      <div className="mt-10">
        <Typography as="h4" className="text-black font-semibold">
          CV
        </Typography>
        <Typography as="h5" className="text-black mt-2">
          <CVCard cvUrl={bider.user.cv} />
        </Typography>
      </div>

      <div className="mt-10">
        <Typography as="h4" className="text-black font-semibold mb-2">
          Certificates
        </Typography>
        <div>
          {bider.user.certificates.map((certificate) => (
            <CVCard
              key={certificate.name}
              cvUrl={certificate.certificate || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidingProfile;

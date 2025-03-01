import CVCard from '@/app/_components/card/cv-card';
import Typography from '@/app/_components/typography/typography';
import { WorkSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import React from 'react';

interface RenderWorkDetailsProps {
  work: WorkSchemaType | undefined;
}

const RenderWorkDetails: React.FC<RenderWorkDetailsProps> = ({ work }) => {
  return (
    <div>
      <Typography className="font-semibold text-black text-xl mb-4">
        Credentials
      </Typography>
      <div className="space-y-3">
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-6">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              CV
            </Typography>
            <CVCard cvUrl={work?.cv || ''} />
          </div>
        </div>

        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-3">
            <Typography className="font-semibold text-base text-[#5C698A] mb-1">
              Are you medically trained
            </Typography>
            <Typography className="font-normal text-black text-base">
              {work?.medical}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-6 max-w-xl">
          <div className="col-span-6">
            <Typography className="font-semibold ml-0.5 text-base text-[#5C698A] mb-1">
              Cerifications
            </Typography>
            {work?.certifications.map((cert, ind) => (
              <div key={ind} className="flex items-center gap-2">
                <CVCard cvUrl={cert?.certificate || ''} />
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderWorkDetails;

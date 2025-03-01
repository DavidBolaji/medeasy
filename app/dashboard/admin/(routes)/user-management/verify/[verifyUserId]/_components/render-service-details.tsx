import Typography from '@/app/_components/typography/typography';
import { ServiceWithoutFormSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import React from 'react';

interface RenderServiceDetailsProps {
  services: ServiceWithoutFormSchemaType | undefined;
}

const RenderServiceDetails: React.FC<RenderServiceDetailsProps> = ({
  services,
}) => {
  return (
    <div>
      <Typography className="font-semibold text-black text-xl mb-4">
        Experience
      </Typography>
      <div className="max-w-xl space-y-2 ">
        {services?.map((service) => (
          <div
            key={service.name}
            className="grid grid-cols-2 bg-primary/10 rounded-2xl p-3"
          >
            <div className="col-span-1 ">
              <Typography className="font-semibold text-base text-[#5C698A] mb-1">
                Service offered
              </Typography>
              <Typography className="font-normal text-black text-base">
                {service.name}
              </Typography>
            </div>
            <div className="col-span-1 ">
              <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
                Years of Experience
              </Typography>
              <Typography className="font-normal text-black text-base">
                {service?.duration}
              </Typography>
            </div>
            <div className="col-span-2 mt-3">
              <Typography className="font-semibold text-[#5C698A] mb-1 text-base">
                About experience
              </Typography>
              <Typography className="font-normal text-black text-base">
                {service?.experience}
              </Typography>
            </div>
          </div>
        ))}
        {services?.length === 0 ? <Typography>Nil</Typography> : null}
      </div>
    </div>
  );
};

export default RenderServiceDetails;

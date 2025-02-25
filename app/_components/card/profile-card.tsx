'use client';

import {
  SignUpTwoSchemaType,
  WorkSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { Service } from '@/src/entities/models/service';

import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Typography from '../typography/typography';
import Link from 'next/link';
import { Divider } from 'antd';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, UserIcon } from 'lucide-react';
import CVCard from './cv-card';
import { usePathname } from 'next/navigation';
import { getPath } from '@/app/_lib/utils';

interface ProfileCardProps {
  personalDetails: SignUpTwoSchemaType;
  work: WorkSchemaType;
  services: Service[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  personalDetails,
  work,
  services,
}) => {
  const path = usePathname();
  const url = getPath(path);
  return (
    <Card className="rounded-2xl border p-0 m-0 bg-white">
      <CardHeader className="flex mb-0 pb-0 flex-row h-full w-full items-center justify-between">
        <Typography className="text-black font-bold text-xl">
          Your Profile
        </Typography>
        <Link
          href={`/dashboard/${url}/personal-details`}
          className="font-instrument font-bold text-base text-blue-400 underline"
        >
          Edit profile
        </Link>
      </CardHeader>
      <Divider className="p-0 m-0" />
      <CardContent>
        <div className="flex items-center gap-x-2 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage alt={`${personalDetails.fname}`} />
            <AvatarFallback className="bg-[#5C698A]">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
          <div>
            <Typography as="h4" className="font-bold">
              {personalDetails.fname} {personalDetails.lname}
            </Typography>
            <Typography
              as="p"
              className="font-bold text-black flex items-center gap-x-2"
            >
              4.5{' '}
              <Star
                size={20}
                color="yellow"
                className="fill-yellow-600 border-yellow-200 text-yellow"
              />
            </Typography>
          </div>
        </div>
        <div className="space-y-4">
          <Typography as="h4" className="font-bold">
            Personal Details
          </Typography>
          <div>
            <Typography as="h4" className="text-secondary font-semibold">
              Name
            </Typography>
            <Typography as="h5" className="text-[#141923] ">
              {personalDetails.fname} {personalDetails.lname}
            </Typography>
          </div>
          <div>
            <Typography as="h4" className="text-secondary font-semibold">
              Gender
            </Typography>
            <Typography as="h5" className="text-[#141923]">
              {personalDetails.gender}
            </Typography>
          </div>
          <div>
            <Typography as="h4" className="text-secondary font-semibold">
              Language Spoken
            </Typography>
            <Typography as="h5" className="text-[#141923]">
              {personalDetails.language}
            </Typography>
          </div>
        </div>

        <div className="mt-10">
          <Typography as="h4" className="text-black font-semibold">
            Services Offered/Experience
          </Typography>
          <Typography as="h5" className="text-black mt-2">
            {services.map((el) => el?.name).join(',')} (
            {services.map((el) => el?.duration).join(',')} year)
          </Typography>
        </div>

        <div className="mt-10">
          <Typography as="h4" className="text-black font-semibold">
            CV
          </Typography>
          <Typography as="h5" className="text-black mt-2">
            <CVCard cvUrl={work.cv} />
          </Typography>
        </div>

        <div className="mt-10">
          <Typography as="h4" className="text-black font-semibold mb-2">
            Certificates
          </Typography>
          <div>
            {work.certifications.map((certificate) => (
              <CVCard
                key={certificate.name}
                cvUrl={certificate.certificate || ''}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

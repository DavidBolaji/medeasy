import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { Images } from '@/app/_constants/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ClearRegister from '../../_components/clear-register';

export const revalidate = 0;

export default async function HelpProviderSuccessPage() {
  return (
    <div className="space-y-6 md:max-w-[442px]">
      <ClearRegister />
      <Image src={Images.Check} alt="check" width={64} height={64} priority />
      <Typography as="h3" className="pb-2">
        Congratulations! Your Help Provide account has been created
      </Typography>
      <Typography as="p" className="font-bold text-black pb-5">
        Welcome aboard! Your account has been created, and you&apos;re all set
        to start exploring.
      </Typography>

      <Typography as="p" className="pb-10">
        Once your account is verified, you can start offering help on the
        MedEasy platform.
      </Typography>

      <Button type="submit" variant={'secondary'} className="w-full" asChild>
        <Link href={'/dashboard/help-provider/personal-details'}>
          Let&apos;s go!
        </Link>
      </Button>
    </div>
  );
}

'use client';

import { Header } from 'antd/es/layout/layout';
import { BellIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';

import { Button } from '@/app/_components/ui/button';
import DropdownDashboard from './dropdown-dashboard';
import { usePathname } from 'next/navigation';
import { getPath } from '@/app/_lib/utils';
import Image from 'next/image';
import { Images } from '@/app/_constants/images';
import { useDashboardNotification } from '@/app/_hooks/use-dashboard-notification';

export const DashboardHeader: React.FC<{
  user: SignUpTwoSchemaType;
  isHome?: boolean;
}> = ({ user, isHome = false }) => {
  const path = usePathname();
  const { toggleNotification } = useDashboardNotification();
  const url = getPath(path);

  return (
    <Header
      style={{
        paddingLeft: 0,
        paddingRight: '20px',
        background: '#fff',
        height: 96,
        display: 'flex',
        borderBottom: '1px solid #E4E4EF',
      }}
    >
      {isHome ? (
        <div className="flex h-20 md:ml-6 ml-5 w-24 items-center">
          <Image width={100} height={40} src={Images.Logo} alt="Medeasy logo" />
        </div>
      ) : null}

      <div className="flex justify-end items-center w-full space-x-2">
        <div className="items-center h-[96px] gap-x-5 flex">
          <Link
            href={`/dashboard/${url}/home`}
            className="text-black text-base md:inline-block hidden"
          >
            Requests
          </Link>
          <Button
            variant={'link'}
            type={'button'}
            size={'icon'}
            className="border-0 scale-125"
            onClick={() => toggleNotification(true)}
          >
            <BellIcon size={30} />
          </Button>
          <DropdownDashboard user={user} url={url} />
        </div>
      </div>
    </Header>
  );
};

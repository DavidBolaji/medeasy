'use client';
import { Button } from '@/app/_components/ui/button';
import Wrapper from '@/app/_components/wrapper/wrapper';
import { Images } from '@/app/_constants/images';
import { cn } from '@/app/_lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const getPath = (path: string) => {
  if (path === '/') return { path: '/', name: 'Homepage' };
  if (path === '/start/help-provider/sign-in')
    return { path: '/start/help-provider/sign-up', name: 'Create an account' };
  if (path === '/start/help-provider/sign-up')
    return { path: '/start/help-provider/sign-in', name: 'Sign in' };
  if (path === '/start/account-owner/sign-in')
    return { path: '/start/account-owner/sign-up', name: 'Create an account' };
  if (path === '/start/account-owner/sign-up')
    return { path: '/start/account-owner/sign-in', name: 'Sign In' };
  return { path: '/', name: 'Homepage' };
};

const linkList = (path: string) => [
  {
    text: getPath('/').name,
    link: getPath('/').path,
    variant: 'link',
  },
  {
    text: getPath(path).name,
    link: getPath(path).path,
    variant: 'outline',
  },
];

const StartNav = () => {
  const path = usePathname();
  return (
    <div className="h-20 items-center bg-white z-20 sticky top-0 w-full">
      <Wrapper>
        <div className="flex justify-between h-20">
          <Image
            src={Images.Logo}
            alt="logo"
            width={170}
            height={50}
            priority
            className="scale-50 -translate-x-10 md:-translate-x-6"
          />
          <div className=" flex items-center">
            {linkList(path).map((link, ind) => (
              <Button
                key={`${ind}_button`}
                type="button"
                variant={link.variant as any}
                asChild
                className={cn('', {
                  'md:block hidden': link.variant === 'link',
                })}
              >
                <Link href={link.link}>{link.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default StartNav;

'use client';
import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Wrapper from '../wrapper/wrapper';
import { Images } from '@/app/_constants/images';
import usePwa from '@/app/_hooks/use-pwa';

const navLinks = [
  // {
  //   id: 'contact',
  //   label: 'Contact Us',
  //   href: '/contact',
  //   type: 'link',
  //   className: 'md:block hidden',
  // },
  {
    id: 'sign-in',
    label: 'Sign In',
    href: '/start/help-provider/sign-in',
    type: 'outline',
    className: 'md:block hidden',
  },
  {
    id: 'started',
    label: 'Get Started',
    href: '/start',
    type: 'secondary',
    className: '',
  },
];

const NavBar = () => {
  const {} = usePwa();
  return (
    <div className="border-b-[#E4E4EF] lg:px-16 bg-white border-b sticky top-0 z-50">
      <Wrapper>
        <nav className="flex justify-between items-center h-24">
          <div className="w-[65px] h-[27px] lg:w-[130px] lg:h-[55px]">
            <Image
              className="w-[65px] h-[27px] lg:w-[130px] lg:h-[55px] object-contain"
              src={Images.Logo}
              alt="medeasy"
            />
          </div>
          <div className="flex gap-x-4">
            {navLinks.map((link) => (
              <Link className={link.className} key={link.id} href={link.href}>
                <Button
                  type="button"
                  variant={link.type as keyof typeof buttonVariants}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      </Wrapper>
    </div>
  );
};

export default NavBar;

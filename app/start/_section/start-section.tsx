import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { Images } from '@/app/_constants/images';
import { cn } from '@/app/_lib/utils';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

const linkList = [
  {
    text: 'Homepage',
    link: '/',
    variant: 'link',
  },
  {
    text: 'Sign In',
    link: '/start/help-provider/sign-in',
    variant: 'outline',
  },
];

interface IStartFlowSectionProps {
  url: string | StaticImageData;
  title: string;
  text: string;
  href: string;
  btnTxt: string;
  variant: any;
}

const StartFlowSection: React.FC<IStartFlowSectionProps> = ({
  url,
  title,
  text,
  btnTxt,
  variant,
  href,
}) => {
  return (
    <div className="flex justify-center lg:px-0 md:px-5 h-full flex-col max-w-[524px] mx-auto">
      <Image
        src={url}
        alt="logo"
        width={208}
        height={48}
        priority
        className="mb-2"
      />
      <Typography
        as="h2"
        className={cn('mb-6', {
          'text-white': variant !== 'default',
        })}
      >
        {title}
      </Typography>
      <Typography
        as="p"
        className={cn('mb-6', {
          'text-white': variant !== 'default',
        })}
      >
        {text}
      </Typography>
      <div>
        <Button
          variant={variant}
          className={cn('', {
            'bg-white text-black hover:border-white border hover:text-white':
              variant !== 'default',
            'hover:border bg-primary text-white border-primary hover:border-primary':
              variant === 'default',
          })}
          asChild
        >
          <Link href={href}>{btnTxt}</Link>
        </Button>
      </div>
    </div>
  );
};

const StartSection = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Desktop */}
      <div className="md:grid grid-cols-12 hidden min-h-screen overflow-y-hidden">
        <div className="col-span-6 bg-primary">
          <div className="flex justify-start lg:ml-8 md:pl-3 translate-y-5">
            <Image
              src={Images.Logo}
              alt="logo"
              width={125}
              height={50}
              priority
            />
          </div>
          <StartFlowSection
            url={Images.PicStackLeft}
            title="Get started as a help provider"
            text="Ready to lend a helping hand? Join our platform and connect with people who need your skills. Set up your profile, showcase your expertise, and start accepting jobs that fit your schedule."
            btnTxt="I want to provide help"
            href="/start/help-provider/sign-in"
            variant={'secondary'}
          />
        </div>
        <div className="col-span-6 bg-white">
          <div className="flex justify-end mr-16 translate-y-5">
            {linkList.map((link, ind) => (
              <Button
                key={`${ind}_button`}
                type="button"
                variant={link.variant as any}
                asChild
              >
                <Link href={link.link}>{link.text}</Link>
              </Button>
            ))}
          </div>
          <StartFlowSection
            url={Images.PicStackRight}
            title="Get started as an account owner"
            text="Need a hand with household tasks? Sign up as an account owner and find trusted help providers ready to assist with everything from repairs to cleaning. Booking quality help has never been easier!"
            btnTxt="I want to get help"
            href="/start/account-owner/sign-in"
            variant={'default'}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden block">
        <div className="">
          <div className="bg-primary p-5">
            <div className="flex justify-between mb-8">
              <Image
                src={Images.Logo}
                alt="logo"
                width={120}
                height={50}
                priority
                className="scale-50 -translate-x-6"
              />
              <div className="flex ">
                {linkList.map((link, ind) => (
                  <Button
                    key={`${ind}_button`}
                    type="button"
                    className="text-white border-white"
                    variant={link.variant as any}
                    asChild
                  >
                    <Link href={link.link}>{link.text}</Link>
                  </Button>
                ))}
              </div>
            </div>
            <StartFlowSection
              url={Images.PicStackLeft}
              title="Get started as a help provider"
              text="Ready to lend a helping hand? Join our platform and connect with people who need your skills. Set up your profile, showcase your expertise, and start accepting jobs that fit your schedule."
              btnTxt="I want to provide help"
              href="/start/help-provider/sign-in"
              variant={'secondary'}
            />
          </div>
          <div className="bg-white p-5">
            <StartFlowSection
              url={Images.PicStackRight}
              title="Get started as an account owner"
              text="Need a hand with household tasks? Sign up as an account owner and find trusted help providers ready to assist with everything from repairs to cleaning. Booking quality help has never been easier!"
              btnTxt="I want to get help"
              href="/start/account-owner/sign-in"
              variant={'default'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSection;

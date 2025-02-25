import Image from 'next/image';
import React from 'react';
import { Button } from '../../../_components/ui/button';
import { Images } from '@/app/_constants/images';
import Link from 'next/link';

const HeroLeftColumn = () => {
  return (
    <div className="">
      <h1 className="text-black font-bold font-instrument lg:max-w-[672px] mb-6 lg:text-[56px] text-[32px]">
        Get the Help You Need, When You Need It
      </h1>
      <p className="text-black-200 font-instrument lg:text-2xl text-xl mb-8 max-w-[442px] font-semibold">
        Connecting You with Reliable Help for All Your Household Tasks an
        Medical Tasks
      </p>
      <div className="flex items-center gap-x-4 mb-8">
        <Button variant={'secondary'} asChild>
          <Link href={'/start'}>Get Started</Link>
        </Button>
        <Button variant={'outline'} asChild>
          <Link href={'#assistance'}>Learn More</Link>
        </Button>
      </div>
      <Image
        src={Images.Help}
        width={301}
        height={40}
        priority
        alt="trusted verified help at your doorstep"
      />
    </div>
  );
};

export default HeroLeftColumn;

import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import Wrapper from '@/app/_components/wrapper/wrapper';
import { Images } from '@/app/_constants/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HelpSection = () => {
  return (
    <div className="bg-primary py-20">
      <Wrapper>
        <div className="grid grid-cols-12">
          <div className="md:col-span-7 col-span-12 md:order-first order-last">
            <div className="flex justify-end">
              <div className="flex  items-center mt-5 gap-x-10">
                <div className="w-16 h-16 relative md:block hidden">
                  <Image
                    fill
                    src={Images.SemiCircleWyt}
                    alt="white semi circle"
                    className="w-full h-full absolute object-fit"
                  />
                </div>
                <div className="flex md:block flex-col items-center justify-center">
                  <Typography
                    as="h2"
                    className="mb-8 md:text-left text-center text-white ml-auto max-w-[558px]"
                  >
                    Get the help you need, hassle-free. It&apos;s that simple!
                  </Typography>

                  <Button className="bg-white border-white" asChild>
                    <Link href={'/start'}>Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 col-span-12">
            <div className="flex justify-center">
              <div className="relative rounded-2xl bg-black overflow-hidden w-[272px] h-[289px]">
                <Image
                  src={Images.Hammer}
                  fill
                  priority
                  alt="help service provider"
                  className="w-full object-cover h-full absolute"
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HelpSection;

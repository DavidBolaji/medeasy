import { Images } from '@/app/_constants/images';
import Image from 'next/image';
import React from 'react';

const HeroRightColumn = () => {
  return (
    <div className="relative">
      <Image
        className="absolute top-40"
        src={Images.SemiCircle}
        width={63}
        height={63}
        alt="testimonials"
        priority
      />
      <Image
        src={Images.Hero}
        width={552}
        height={480}
        alt="testimonials"
        priority
      />
      <Image
        className="absolute top-[15%] -right-[30px]"
        src={Images.SemiCircleRyt}
        width={63}
        height={63}
        alt="testimonials"
        priority
      />
    </div>
  );
};

export default HeroRightColumn;

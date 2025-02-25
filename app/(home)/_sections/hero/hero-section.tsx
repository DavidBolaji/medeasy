import React from 'react';
import HeroRightColumn from './hero-right-column';
import HeroLeftColumn from './hero-left-column';
import Wrapper from '../../../_components/wrapper/wrapper';

const HeroSection = () => {
  return (
    <div className="md:pt-20 pt-5 overflow-hidden bg-white">
      <Wrapper>
        <div className="w-full md:flex block lg:px-10">
          <HeroLeftColumn />
          <div className="md:mt-0 mt-14">
            <HeroRightColumn />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HeroSection;

import { Button } from '@/components/ui/button'
import Wrapper from '@/components/wrapper/wrapper'
import React from 'react'
import HeroRightColumn from './hero-right-column'

const HeroSection = () => {
    return (
        <div className='mt-20'>
            <Wrapper>
                <div className='w-full flex px-5'>
                    <div className=''>
                        <h1 className='text-black font-bold font-instrument max-w-[672px] mb-6 lg:text-[56px]'>Get the Help You Need, When You Need It</h1>
                        <p className='text-black-200 font-instrument lg:text-2xl mb-8 max-w-[442px] font-semibold'>Connecting You with Reliable Help for All Your Household Tasks an Medical Tasks</p>
                        <div className='flex items-center gap-x-4'>
                            <Button variant={'secondary'}>Get Started</Button>
                            <Button variant={'default'}>Learn More</Button>

                        </div>
                    </div>
                    <div className=''>
                        <HeroRightColumn />
                    </div>
                </div>
            </Wrapper>

        </div>
    )
}

export default HeroSection

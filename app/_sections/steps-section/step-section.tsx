import Card from '@/app/_components/card/card';
import Typography from '@/app/_components/typography/typography';
import Wrapper from '@/app/_components/wrapper/wrapper';
import React from 'react';

const steps = [
  {
    title: 'Request Help in Minutes',
    description:
      'Describe the task you need assistance with, from cleaning and repairs to other household chores. Select the type of service, set your location, and submit your request with just a few taps.',
  },
  {
    title: 'Connect with Verified Helpers',
    description:
      'Our platform matches you with skilled, verified help providers nearby. Browse profiles, read reviews, and choose the best fit for your needs.',
  },
];
const steps2 = [
  {
    title: 'Chat and Confirm Details',
    description:
      'Use our secure chat to discuss the task, negotiate rates, and confirm details directly with your chosen helper. Clear communication ensures everyone is on the same page.',
  },
  {
    title: 'Secure, Simple Payments',
    description:
      'Once the job is done, complete payment quickly and securely through our platform. We handle the details, so you can relax with peace of mind.',
  },
  {
    title: 'Get Help, Hassle-Free',
    description:
      "Sit back and enjoy quality help at your doorstep! It's that simple.",
  },
];

const StepSection = () => {
  return (
    <div
      id="assistance"
      className="bg-gradient-to-b from-white to-[#B8CBFF] pb-24 pt-16 lg:mt-0 lg:pt-20 min-h-screen overflow-hidden"
    >
      <Wrapper>
        <div className="grid lg:grid-cols-7 grid-cols-2 lg:px-10 lg:space-y-0 space-y-4">
          <Typography
            as="h2"
            className="col-span-3 flex items-center min-w-[442px]"
          >
            Quick and Easy Assistance at Your Fingertips
          </Typography>
          {steps.map((step, ind) => (
            <div key={step.title} className="col-span-2">
              <div className="flex justify-end">
                <Card ind={ind} title={step.title} text={step.description} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-6 lg:pl-52 lg:pr-10 mt-4 lg:space-y-0 space-y-4">
          {steps2.map((step, ind) => (
            <div key={step.title} className="col-span-2">
              <div className="flex justify-end">
                <Card
                  ind={ind + 2}
                  title={step.title}
                  text={step.description}
                />
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default StepSection;

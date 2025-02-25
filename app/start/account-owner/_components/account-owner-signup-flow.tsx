'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMultiStep } from '@/app/_hooks/use-multiple-step';
import Steper from '@/app/_components/steper/steper';

import SignUpOneForm from '@/app/_components/forms/auth/sign-up/sign-up-one';
import SignUpTwoForm from '@/app/_components/forms/auth/sign-up/sign-up-two';
import SignUpFourForm from '@/app/_components/forms/auth/sign-up/sign-up-four';
import SignUpAddressForm from '@/app/_components/forms/auth/sign-up/sign-up-address';

const AccountOwnerSignUpFlow = () => {
  const { currentStep, nextStep, prevStep } = useMultiStep(4);
  const steps = [
    <SignUpOneForm key="one" nextStep={nextStep} />,
    <SignUpTwoForm key="two" nextStep={nextStep} prevStep={prevStep} />,
    <SignUpAddressForm key="address" nextStep={nextStep} prevStep={prevStep} />,
    <SignUpFourForm
      key="four"
      nextStep={nextStep}
      prevStep={prevStep}
      isLast
    />,
  ];

  return (
    <AnimatePresence mode="wait">
      <div className="w-full max-w-md mx-auto p-6">
        <Steper step={currentStep} steps={steps} />
      </div>
    </AnimatePresence>
  );
};

export default AccountOwnerSignUpFlow;

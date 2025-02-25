'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMultiStep } from '@/app/_hooks/use-multiple-step';
import Steper from '@/app/_components/steper/steper';

import SignUpThreeForm from '@/app/_components/forms/auth/sign-up/sign-up-three';
import SignUpOneForm from '@/app/_components/forms/auth/sign-up/sign-up-one';
import SignUpTwoForm from '@/app/_components/forms/auth/sign-up/sign-up-two';
import SignUpFourForm from '@/app/_components/forms/auth/sign-up/sign-up-four';
import SignUpFiveForm from '@/app/_components/forms/auth/sign-up/sign-up-five';

const SignUpFlow = () => {
  const { currentStep, nextStep, prevStep } = useMultiStep(5);
  const steps = [
    <SignUpOneForm key={'one'} nextStep={nextStep} />,
    <SignUpTwoForm key={'two'} nextStep={nextStep} prevStep={prevStep} />,
    <SignUpThreeForm key={'three'} nextStep={nextStep} prevStep={prevStep} />,
    <SignUpFourForm key={'four'} nextStep={nextStep} prevStep={prevStep} />,
    <SignUpFiveForm key={'five'} prevStep={prevStep} />,
  ];

  return (
    <AnimatePresence mode="wait">
      <div className="w-full max-w-md mx-auto p-6">
        <Steper step={currentStep} steps={steps} />
        {/* <StepNavigator step={currentStep} totalSteps={totalSteps} next={nextStep} prev={prevStep} /> */}
      </div>
    </AnimatePresence>
  );
};

export default SignUpFlow;

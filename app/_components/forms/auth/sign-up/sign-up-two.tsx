'use client';
import React from 'react';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  signUpTwoSchema,
  SignUpTwoSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import useSignUp from '@/app/_hooks/use-sign-up';
import Typography from '@/app/_components/typography/typography';
import FormikInput from '@/app/_components/input/formik-input';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import { genderList } from '@/app/_lib/data';
import FormikCalenderInput from '@/app/_components/input/formik-calender-input';
import { Button } from '@/app/_components/ui/button';

const SignUpTwoForm: React.FC<{
  nextStep?: () => void;
  prevStep?: () => void;
}> = ({ nextStep, prevStep }) => {
  const { insert, getSignUpData } = useSignUp();

  const onSubmit = (values: SignUpTwoSchemaType) => {
    insert<SignUpTwoSchemaType>(values);
    nextStep && nextStep();
  };

  return (
    <Formik
      initialValues={getSignUpData<SignUpTwoSchemaType>([
        'fname',
        'lname',
        'gender',
        'dob',
        'language',
      ])}
      validationSchema={toFormikValidationSchema(signUpTwoSchema)}
      onSubmit={onSubmit}
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, values }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Tell us more about you
          </Typography>
          <FormikInput label="First name" name="fname" type="text" />
          <FormikInput label="Last name" name="lname" type="text" />
          <FormikSelectInput
            label="Gender"
            name="gender"
            placeholder="Select your gender"
            options={genderList}
          />
          <FormikCalenderInput
            label="Date of birth"
            placeholder="Select date"
            name="dob"
          />
          <FormikInput label="Language spoken" name="language" type="text" />

          <div className="pb-3" />
          <div className="flex gap-x-4">
            <Button
              type="button"
              variant={'outline'}
              className="w-full"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              variant={'secondary'}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpTwoForm;

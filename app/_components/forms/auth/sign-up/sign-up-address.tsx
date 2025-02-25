'use client';
import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import useSignUp from '@/app/_hooks/use-sign-up';
import Typography from '../../../typography/typography';
import { Button } from '../../../ui/button';

import {
  signUpAddressSchema,
  SignUpAddressSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

import FormikAddressInput from '@/app/_components/input/formik-addres-input';

const SignUpAddressForm: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
}> = ({ nextStep, prevStep }) => {
  const { insert, getSignUpData } = useSignUp();

  const onSubmit = (values: SignUpAddressSchemaType) => {
    insert<SignUpAddressSchemaType>(values);
    nextStep();
  };

  return (
    <Formik
      initialValues={getSignUpData<SignUpAddressSchemaType>([
        'country',
        'state',
        'street',
        'address',
        'other',
      ])}
      validationSchema={toFormikValidationSchema(signUpAddressSchema)}
      onSubmit={onSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Tell us about what you do
          </Typography>
          <Typography as="p" className="">
            This address will only be visible to the help providers you are
            matched with.
          </Typography>
          <FormikAddressInput
            country={'country'}
            state="state"
            street="street"
            other="other"
            address="address"
            label="Residential address"
          />

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

export default SignUpAddressForm;

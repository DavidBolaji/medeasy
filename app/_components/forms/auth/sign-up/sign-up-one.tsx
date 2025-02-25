'use client';
import React from 'react';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import FormikInput from '../../../input/formik-input';
import Typography from '../../../typography/typography';
import { Button } from '../../../ui/button';
import useSignUp from '@/app/_hooks/use-sign-up';

import {
  signUpOneSchema,
  SignUpOneSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

const SignUpOneForm: React.FC<{ nextStep?: () => void }> = ({ nextStep }) => {
  const { insert, getSignUpData } = useSignUp();

  const onSubmit = ({ confirm_password, ...rest }: SignUpOneSchemaType) => {
    insert<Omit<SignUpOneSchemaType, 'confirm_password'>>(rest);
    nextStep && nextStep();
  };

  return (
    <Formik
      initialValues={getSignUpData<SignUpOneSchemaType>([
        'email',
        'password',
        'confirm_password',
      ])}
      validationSchema={toFormikValidationSchema(signUpOneSchema)}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Get started as a help provider
          </Typography>

          <FormikInput label="Email" name="email" type="email" />
          <FormikInput label="Password" name="password" type="password" />
          <FormikInput
            label="Confirm Password"
            name="confirm_password"
            type="password"
          />
          <div className="" />
          <Button
            type="submit"
            disabled={!isValid}
            variant={'secondary'}
            className="w-full"
          >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpOneForm;

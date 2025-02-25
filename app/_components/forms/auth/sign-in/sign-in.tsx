'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  signInSchema,
  signInSchemaType,
} from '@/src/entities/models/auth/login-schema';
import { usePathname } from 'next/navigation';
import { getRole } from '@/app/_lib/utils';
import { signIn } from '../actions';
import { Loader2 } from 'lucide-react';
import { useNotification } from '@/app/_hooks/use-notification';

const SignInForm = () => {
  const path = usePathname();
  const role = getRole(path);
  const { toggleNotification } = useNotification();

  const onSubmit = async (values: signInSchemaType) => {
    const response = await signIn(values, role);
    if (!response) {
      return toggleNotification({
        show: true,
        title: 'Login successfull',
        type: 'success',
        message: 'User has been succesfully logged in',
      });
    }

    if (response?.error) {
      toggleNotification({
        show: true,
        title: 'Login Failed',
        type: 'error',
        message: response.error,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={toFormikValidationSchema(signInSchema)}
      validateOnMount
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <FormikInput label="Email" name="email" type="email" />
          <FormikInput label="Password" name="password" type="password" />
          <div className="" />
          <Button
            disabled={isSubmitting || !isValid}
            variant={'secondary'}
            className="w-full flex justify-center"
          >
            {isSubmitting ? (
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            ) : (
              'Sign In'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;

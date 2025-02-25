'use client';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import useSignUp from '@/app/_hooks/use-sign-up';

import {
  allSignUppAccountOwnerSchemaType,
  signUpFourSchema,
  SignUpFourSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import Typography from '@/app/_components/typography/typography';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import { iDList } from '@/app/_lib/data';
import FormikInput from '@/app/_components/input/formik-input';
import FormikUpload from '@/app/_components/input/formik-upload-input';
import FormikCalenderInput from '@/app/_components/input/formik-calender-input';
import { Button } from '@/app/_components/ui/button';
import { signUpAccountOwner } from '../actions';
import { Loader2 } from 'lucide-react';
import { useNotification } from '@/app/_hooks/use-notification';
import usePwa from '@/app/_hooks/use-pwa';

const SignUpFourForm: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
  isLast?: boolean;
}> = ({ nextStep, prevStep, isLast = false }) => {
  const { insert, getSignUpData, signUpData } = useSignUp();
  const {} = usePwa();
  const { toggleNotification } = useNotification();

  const handleSubmit = async (
    values: SignUpFourSchemaType,
    setSubmitting: (arg: boolean) => void
  ) => {
    setSubmitting(true);

    try {
      await signUpAccountOwner({
        ...signUpData,
        ...values,
      } as unknown as allSignUppAccountOwnerSchemaType);
      toggleNotification({
        type: 'success',
        title: 'Account Created Successfully',
        message: 'Account Owner account has been created successfully',
        show: true,
      });
    } catch (error) {
      if ((error as Error).message === 'NEXT_REDIRECT') {
        return toggleNotification({
          show: true,
          type: 'success',
          title: 'Account Created Successfully',
          message: 'Account Owner account has been created successfully',
        });
      }
      toggleNotification({
        show: true,
        title: 'Account creation Failed',
        type: 'error',
        message: (error as Error).message,
      });
      console.log((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (
    values: SignUpFourSchemaType,
    { setSubmitting }: FormikHelpers<SignUpFourSchemaType>
  ) => {
    insert<SignUpFourSchemaType>(values);
    if (!isLast) {
      nextStep();
    } else {
      await handleSubmit(values, setSubmitting);
    }
  };

  return (
    <Formik
      initialValues={getSignUpData<SignUpFourSchemaType>([
        'type',
        'no',
        'doc',
        'expiry',
        'verified',
      ])}
      validationSchema={toFormikValidationSchema(signUpFourSchema)}
      onSubmit={onSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Let&apos;s verify your identity
          </Typography>

          <FormikSelectInput
            label="ID type"
            name="type"
            placeholder="Select your id type"
            options={iDList}
          />
          <FormikInput
            label="Provide the number on your id"
            name="no"
            type="text"
          />
          <FormikUpload txt="Upload ID" name="doc" />
          <FormikCalenderInput
            label="ID expiry date"
            placeholder="Id expiry date"
            name="expiry"
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
              {isSubmitting ? (
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpFourForm;

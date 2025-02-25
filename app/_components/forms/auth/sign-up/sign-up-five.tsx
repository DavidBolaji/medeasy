'use client';
import React, { useCallback, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import useSignUp from '@/app/_hooks/use-sign-up';

import {
  allSignUpSchemaType,
  signUpFiveSchema,
  SignUpFiveSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signUp, verifyUserAccount } from '../actions';
import Typography from '@/app/_components/typography/typography';
import FormikSelectInput from '@/app/_components/input/formik-select-input';

import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';
import { IVerifyUser } from '@/src/entities/models/verification';
import useBank from '@/app/_hooks/use-bank';
import { getRole } from '@/app/_lib/utils';
import { useNotification } from '@/app/_hooks/use-notification';

const SignUpFiveForm: React.FC<{
  prevStep: () => void;
}> = ({ prevStep }) => {
  const { insert, getSignUpData, signUpData } = useSignUp();
  const { bankList } = useBank();
  const debounce = useRef<NodeJS.Timer | null>(null);
  const { toggleNotification } = useNotification();

  const path = usePathname();
  const role = getRole(path);

  const previousValues = useRef<{ actNo: string; bank: string }>({
    actNo: '',
    bank: '',
  });

  const onSubmit = async (
    values: SignUpFiveSchemaType,
    { setSubmitting }: FormikHelpers<SignUpFiveSchemaType>
  ) => {
    setSubmitting(true);
    insert<SignUpFiveSchemaType>({ ...values, role });
    const response =await signUp(signUpData as allSignUpSchemaType);

    if(!response) {
      setSubmitting(false)
      return toggleNotification({
        show: true,
        title: 'Signup success',
        message: 'Signup process was succesfull',
        type: 'success',
      });
    }

    setSubmitting(false);
    toggleNotification({
      show: true,
      title: 'Signup Error',
      message: response.error,
      type: 'error',
    });
   
  };

  const handleVerify = useCallback(async (actNo: string, bank: string) => {
    if (!actNo || !bank) return;

    if (
      previousValues.current.actNo === actNo &&
      previousValues.current.bank === bank
    ) {
      return; // Skip verification if already verified
    }

    insert<Partial<SignUpFiveSchemaType>>({ actVerified: true, role });

    try {
      const result = await verifyUserAccount<IVerifyUser>({
        type: signUpData?.type!,
        idNumber: signUpData?.no!,
        actNo,
        bank,
        user: {
          fname: signUpData?.fname!,
          lname: signUpData?.lname!,
          dob: signUpData?.dob!,
        },
      });

      if (result?.length) {
        insert<Partial<SignUpFiveSchemaType>>({
          verifiedName: result,
          actVerified: true,
          actNo,
          bank,
          role,
        });
        previousValues.current = { actNo, bank };
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  }, []);

  return (
    <Formik
      initialValues={getSignUpData<SignUpFiveSchemaType>([
        'actNo',
        'bank',
        'role',
        'verifiedName',
      ])}
      validationSchema={toFormikValidationSchema(signUpFiveSchema)}
      onSubmit={onSubmit}
      validate={(values) => {
        if (values.actNo && values.bank) {
          if (debounce.current)
            clearTimeout(debounce.current as unknown as number);

          debounce.current = setTimeout(() => {
            handleVerify(values.actNo, values.bank);
          }, 2000);
        }
      }}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting, values, errors }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Payment details
          </Typography>
          <Typography as="p" className="">
            This is the account your money will be paid to for the help you
            offer. It must match the name on your ID.
          </Typography>

          <FormikSelectInput
            label="Bank Name"
            name="bank"
            placeholder="Bank name"
            options={bankList || [{ key: '054', label: 'Guaranty Trust Bank' }]}
          />
          <FormikInput
            label="Account number"
            name="actNo"
            placeholder="Account number"
            type="text"
          />

          <div className="pb-3" />
          <div className="flex gap-x-4">
            <Button
              type="button"
              variant={'outline'}
              className="w-full"
              onClick={prevStep}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              variant={'secondary'}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="h-8 w-8 animate-spin text-white" />
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

export default SignUpFiveForm;

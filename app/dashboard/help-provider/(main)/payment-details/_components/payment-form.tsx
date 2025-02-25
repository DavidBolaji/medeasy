'use client';
import React, { useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Loader2 } from 'lucide-react';

import {
  signUpFiveSchema,
  SignUpFiveSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

import FormikSelectInput from '@/app/_components/input/formik-select-input';
import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';
import useBank from '@/app/_hooks/use-bank';
import Typography from '@/app/_components/typography/typography';
import { updatePaymentDetails, updateValidatePaymentDetails } from '../action';

interface PaymentDetailFormProps {
  initialValues: SignUpFiveSchemaType;
}

const PaymentDetailForm: React.FC<PaymentDetailFormProps> = ({
  initialValues,
}) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { bankList } = useBank();
  const previousValues = useRef<{
    actNo: string;
    bank: string;
    actVerified: boolean;
    verifiedName: string;
  }>({
    actNo: initialValues.actNo,
    bank: initialValues.bank,
    actVerified: initialValues.actVerified,
    verifiedName: initialValues.verifiedName,
  });

  /**
   * Submits the verification details.
   */
  const onSubmit = async (
    values: SignUpFiveSchemaType,
    { setSubmitting }: FormikHelpers<SignUpFiveSchemaType>
  ) => {
    setSubmitting(true);
    try {
      await updatePaymentDetails(values);
      // Show success notification if needed
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Verifies the provided ID asynchronously.
   */
  const handleVerify = async (actNo: string, bank: string) => {
    if (!actNo || !bank) return;

    // Prevent redundant verification
    if (
      previousValues.current.actNo === actNo &&
      previousValues.current.bank === bank
    ) {
      return; // Skip verification if already verified
    }

    previousValues.current = {
      actNo,
      bank,
      actVerified: false,
      verifiedName: '',
    };

    try {
      const result = await updateValidatePaymentDetails({
        actNo,
        bank,
      });

      if (result && result?.length) {
        previousValues.current = {
          actNo,
          bank,
          actVerified: Boolean(result.length),
          verifiedName: result,
        };
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  /**
   * Debounced verification on input changes.
   */
  useEffect(() => {
    if (initialValues.actNo && initialValues.bank) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        handleVerify(initialValues.actNo, initialValues.bank);
      }, 2000);
    }
  }, [initialValues.actNo, initialValues.bank]);

  return (
    <Formik
      initialValues={{
        ...initialValues,
        actVerified: previousValues.current.actVerified,
        verifiedName: previousValues.current.verifiedName,
      }}
      validationSchema={toFormikValidationSchema(signUpFiveSchema)}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="p" className="">
            This is the account your money will be paid to for the help you
            offer. It must match the name on your ID.
          </Typography>

          <FormikSelectInput
            label="Bank Name"
            name="bank"
            placeholder="Bank name"
            options={bankList || []}
          />
          <FormikInput
            label="Account number"
            name="actNo"
            placeholder="Account number"
            type="text"
          />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="secondary"
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            ) : (
              'Save'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentDetailForm;

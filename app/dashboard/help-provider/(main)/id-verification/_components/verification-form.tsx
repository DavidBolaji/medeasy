'use client';

import React, { useRef, useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  signUpFourSchema,
  SignUpFourSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

import FormikSelectInput from '@/app/_components/input/formik-select-input';
import FormikInput from '@/app/_components/input/formik-input';
import FormikUpload from '@/app/_components/input/formik-upload-input';
import FormikCalenderInput from '@/app/_components/input/formik-calender-input';
import { Button } from '@/app/_components/ui/button';
import { Loader2 } from 'lucide-react';

import { iDList } from '@/app/_lib/data';
import {
  updateIDVerificationDetails,
  updateVerificationDetails,
} from '../action';

interface VerificationFormProps {
  initialValues: SignUpFourSchemaType;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  initialValues,
}) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const previousValues = useRef<{
    type: string;
    no: string;
  }>({
    type: initialValues.type,
    no: initialValues.no,
  });

  /**
   * Submits the verification details.
   */
  const onSubmit = async (
    values: SignUpFourSchemaType,
    { setSubmitting }: FormikHelpers<SignUpFourSchemaType>
  ) => {
    setSubmitting(true);
    try {
      await updateVerificationDetails(values);
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
  const handleVerify = async (type: string, no: string) => {
    if (!type || !no) return;

    // Prevent redundant verification
    if (
      previousValues.current.type === type &&
      previousValues.current.no === no
    ) {
      return;
    }

    previousValues.current = { type, no };

    try {
      const result = await updateIDVerificationDetails({ type, idNumber: no });
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  /**
   * Debounced verification on input changes.
   */
  useEffect(() => {
    if (initialValues.type && initialValues.no) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        handleVerify(initialValues.type, initialValues.no);
      }, 2000);
    }
  }, [initialValues.type, initialValues.no]);

  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={toFormikValidationSchema(signUpFourSchema)}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <FormikSelectInput
            label="ID Type"
            name="type"
            placeholder="Select your ID type"
            options={iDList}
          />

          <FormikInput
            label="ID Number"
            name="no"
            type="text"
            placeholder="Enter your ID number"
          />

          <FormikUpload txt="Upload ID" name="doc" />

          <FormikCalenderInput
            label="ID Expiry Date"
            placeholder="Select ID expiry date"
            name="expiry"
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

export default VerificationForm;

'use client';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  SignUpAddressSchemaType,
  signUpAddressSchema,
} from '@/src/entities/models/auth/sign-up-schema';

import { Button } from '@/app/_components/ui/button';

import { Loader2 } from 'lucide-react';
import FormikAddressInput from '@/app/_components/input/formik-addres-input';

function AddressForm({
  initialValues,
}: {
  initialValues: SignUpAddressSchemaType;
}) {
  const onSubmit = async (
    values: SignUpAddressSchemaType,
    { setSubmitting }: FormikHelpers<SignUpAddressSchemaType>
  ) => {
    setSubmitting(true);
    try {
      // update
      //   await updateAddress(values);
      // show notification
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(signUpAddressSchema)}
      onSubmit={onSubmit}
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <FormikAddressInput
            country={'country'}
            state="state"
            street="street"
            other="other"
            address="address"
            label="Residential address"
          />

          <div className="">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              variant={'secondary'}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddressForm;

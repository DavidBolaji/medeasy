'use client';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  signUpTwoSchema,
  SignUpTwoSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

import FormikInput from '@/app/_components/input/formik-input';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import { genderList } from '@/app/_lib/data';
import FormikCalenderInput from '@/app/_components/input/formik-calender-input';
import { Button } from '@/app/_components/ui/button';
import { updatePersonalDetails } from '../action';
import { Loader2 } from 'lucide-react';

function PersonalDetailsForm({
  initialValues,
}: {
  initialValues: SignUpTwoSchemaType;
}) {
  const onSubmit = async (
    values: SignUpTwoSchemaType,
    { setSubmitting }: FormikHelpers<SignUpTwoSchemaType>
  ) => {
    setSubmitting(true);
    try {
      // update
      await updatePersonalDetails({
        ...values,
        dob: values.dob.toString(),
      });
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
      validationSchema={toFormikValidationSchema(signUpTwoSchema)}
      onSubmit={onSubmit}
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
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

export default PersonalDetailsForm;

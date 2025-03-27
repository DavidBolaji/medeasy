'use client';
import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import useSignUp from '@/app/_hooks/use-sign-up';
import Typography from '../../../typography/typography';
import { Button } from '../../../ui/button';
import FormikSelectInput from '../../../input/formik-select-input';
import FormikUpload from '../../../input/formik-upload-input';
import CertificationField from './sign-up-three/certification-field';

import {
  signUpThreeSchema,
  SignUpThreeSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import ServiceField from './sign-up-three/service-field';
import { medicalList } from '@/app/_lib/data';

const SignUpThreeForm: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
}> = ({ nextStep, prevStep }) => {
  const { insert, getSignUpData } = useSignUp();

  const onSubmit = (values: SignUpThreeSchemaType) => {
    insert<SignUpThreeSchemaType>(values);
    console.log(values);
    nextStep();
  };

  return (
    <Formik
      // @ts-ignore
      initialValues={getSignUpData<SignUpThreeSchemaType>([
        'services',
        'cv',
        'medical',
        'certifications',
      ])}
      validationSchema={toFormikValidationSchema(signUpThreeSchema)}
      onSubmit={onSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, values, errors }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <Typography as="h3" className="">
            Tell us about you
          </Typography>

          <FormikUpload
            name="cv"
            uploadTxt="CV uploaded uccessfully"
            label="Do you have a CV?"
          />

          <FieldArray name="services">
            {({ push, remove }) =>
              values?.services?.map((_, index) => (
                <ServiceField
                  key={index}
                  index={index}
                  isLast={index === values.services.length - 1}
                  onAdd={() => push({ experience: '', duration: '', name: '' })}
                  onRemove={() => remove(index)}
                />
              ))
            }
          </FieldArray>

          <FormikSelectInput
            name="medical"
            label="Are you medically trained?"
            placeholder="Are you trained?"
            options={medicalList}
          />

          <FieldArray name="certifications">
            {({ push, remove }) =>
              values?.certifications?.map((_, index) => (
                <CertificationField
                  key={index}
                  index={index}
                  isLast={index === values.certifications.length - 1}
                  onAdd={() => push({ certificate: '', name: '' })}
                  onRemove={() => remove(index)}
                />
              ))
            }
          </FieldArray>

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

export default SignUpThreeForm;

'use client';
import React from 'react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  workSchema,
  WorkSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

import { medicalList } from '@/app/_lib/data';
import { Loader2 } from 'lucide-react';
import FormikUpload from '@/app/_components/input/formik-upload-input';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import CertificationField from '@/app/_components/forms/auth/sign-up/sign-up-three/certification-field';
import { Button } from '@/app/_components/ui/button';
import { updatePersonalWork } from '../action';

const WorkDetailForm = ({
  initialValues,
}: {
  initialValues: WorkSchemaType;
}) => {
  const onSubmit = async (
    values: WorkSchemaType,
    { setSubmitting }: FormikHelpers<WorkSchemaType>
  ) => {
    setSubmitting(true);
    try {
      await updatePersonalWork(values);
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(workSchema)}
      onSubmit={onSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, values, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
          <FormikUpload
            uploadTxt="CV uploaded successfully"
            name="cv"
            label="Do you have a CV?"
          />

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
          <div className="flex gap-x-4">
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
};

export default WorkDetailForm;

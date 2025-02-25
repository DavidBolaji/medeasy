'use client';
import React from 'react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  serviceSchema,
  ServiceSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import ServiceField from '@/app/_components/forms/auth/sign-up/sign-up-three/service-field';
import { Loader2 } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { updatePersonalService } from '../action';

function ServiceDetailsForm({
  initialValues,
}: {
  initialValues: ServiceSchemaType;
}) {
  const onSubmit = async (
    values: ServiceSchemaType,
    { setSubmitting }: FormikHelpers<ServiceSchemaType>
  ) => {
    setSubmitting(true);

    try {
      // update
      await updatePersonalService({ services: values.services });
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
      validationSchema={toFormikValidationSchema(serviceSchema)}
      onSubmit={onSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
    >
      {({ handleSubmit, isValid, values, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-6 md:min-w-[400px]">
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

          <div className="pb-3" />
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
}

export default ServiceDetailsForm;

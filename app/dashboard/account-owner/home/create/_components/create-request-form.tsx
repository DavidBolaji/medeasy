'use client';

import FormikInput from '@/app/_components/input/formik-input';
import FormikSelectInput from '@/app/_components/input/formik-select-input';
import { Button } from '@/app/_components/ui/button';
import useRequest from '@/app/_hooks/use-request';
import {
  requestSchema,
  RequestSchemaType,
} from '@/src/entities/models/requests';
import { Form, Formik, FormikHelpers } from 'formik';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createRequest } from '../action';
import { requstFormList } from '@/app/_lib/data';
import FormikFormatedTextArea from '@/app/_components/input/formik-formated-textarea';
import FormikCheckbox from '@/app/_components/input/formik-checkbox';
import FormikCalenderInput from '@/app/_components/input/formik-calender-input';

const CreateRequestForm = () => {
  const { insert } = useRequest();

  const onSubmit = async (
    values: RequestSchemaType,
    { setSubmitting }: FormikHelpers<RequestSchemaType>
  ) => {
    setSubmitting(true);
    try {
      console.log(values);
      await createRequest(values);
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        service: '',
        title: '',
        description: '',
        duration: '',
        start: '',
        location: '',
        price: '',
        negotiable: false,
      }}
      validate={(values) => {
        const error = {};
        insert(values);
        return error;
      }}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(requestSchema)}
      validateOnMount
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-4">
          {requstFormList.map((field) => {
            if (field.type === 'select') {
              return (
                <FormikSelectInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={field.options || []}
                />
              );
            }
            if (field.type === 'textarea') {
              return (
                <FormikFormatedTextArea
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              );
            }
            if (field.type === 'calender') {
              return (
                <FormikCalenderInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              );
            }
            return (
              <FormikInput
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                amount={field?.amount || false}
              />
            );
          })}
          <FormikCheckbox label="Payment is negotiable" name="negotiable" />
          <Button type="submit" variant={'secondary'} className="w-full flex">
            {isSubmitting ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              'Request Help'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateRequestForm;

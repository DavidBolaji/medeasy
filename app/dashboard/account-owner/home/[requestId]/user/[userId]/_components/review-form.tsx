'use client';

import FormikFormatedTextArea from '@/app/_components/input/formik-formated-textarea';
import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';

import { Form, Formik, FormikHelpers } from 'formik';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useParams } from 'next/navigation';

import FormikRatingInput from '@/app/_components/input/formik-rating-input';
import {
  ReturnSingleReviewSchemaType,
  reviwFormSchema,
  ReviwFormSchemaType,
} from '@/src/entities/models/review';
import { createReview, updateReview } from '../action';

interface ReviewFormProps {
  review: ReturnSingleReviewSchemaType | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  const params = useParams();
  const isFilled = Boolean(review?.id);
  const onSubmit = async (
    values: ReviwFormSchemaType,
    { setSubmitting }: FormikHelpers<ReviwFormSchemaType>
  ) => {
    console.log(values);
    setSubmitting(true);
    try {
      if (review?.id) {
        await updateReview({
          id: review.id,
          ...values,
          receivedId: (params?.userId as string) || '',
          requestId: (params?.requestId as string) || '',
        });
      } else {
        await createReview({
          ...values,
          receivedId: (params?.userId as string) || '',
          requestId: (params?.requestId as string) || '',
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        description: review?.description || '',
        title: review?.title || '',
        star: +(review?.star || 0),
      }}
      enableReinitialize
      validationSchema={toFormikValidationSchema(reviwFormSchema)}
      validateOnMount
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="space-y-4 pb-20">
          <FormikRatingInput
            name="star"
            label="How would you rate the service provided?"
            disabled={isFilled}
          />
          <FormikInput
            name="title"
            label="Review Title"
            placeholder="Review Title"
            disabled={isFilled}
          />
          <FormikFormatedTextArea
            name="description"
            label="Describe your experience with this help provider"
            placeholder="Describe your experience with this help provider"
            disabled={isFilled}
          />

          {!isFilled ? (
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              variant={'secondary'}
              className="w-full flex"
            >
              {isSubmitting ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : review?.id ? (
                'Update Review'
              ) : (
                'Leave Review'
              )}
            </Button>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;

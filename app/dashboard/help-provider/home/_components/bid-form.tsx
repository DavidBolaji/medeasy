'use client';

import FormikCalenderInput from '@/app/_components/input/formik-calender-input';
import FormikCheckbox from '@/app/_components/input/formik-checkbox';
import FormikFormatedTextArea from '@/app/_components/input/formik-formated-textarea';
import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';
import { bidSchema, BidSchemaType } from '@/src/entities/models/bid';
import { Form, Formik, FormikHelpers } from 'formik';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  createBid,
  createDashboardNotification,
  sendPushNotification,
} from '../action';
import { useParams } from 'next/navigation';
import Typography from '@/app/_components/typography/typography';
import { useNotification } from '@/app/_hooks/use-notification';

interface BidFormProps {
  price?: string;
  negotiable: boolean;
  requestUserId: string;
  job: string;
}

const BidForm: React.FC<BidFormProps> = ({
  price,
  negotiable,
  requestUserId,
  job,
}) => {
  const params = useParams();
  const { toggleNotification } = useNotification();

  const onSubmit = async (
    values: BidSchemaType,
    { setSubmitting }: FormikHelpers<BidSchemaType>
  ) => {
    setSubmitting(true);
    const message = `New offer received: ${values.price} for your request "${job}"`;
    const message2 = `Offer sent: ${values.price}`;

    try {
      await createBid(values, params?.requestId as string);
      await Promise.all([
        // send notification for request user
        createDashboardNotification(requestUserId, message, 'New Offer'),
        sendPushNotification(requestUserId, message, 'New Offer'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          message2,
          `You submitted an offer for "${job}"`
        ),
        sendPushNotification(
          undefined,
          message2,
          `You submitted an offer for "${job}"`
        ),
      ]);
      toggleNotification({
        show: true,
        title: 'New Offer sent',
        message: message2,
        type: 'success',
      });
    } catch (error) {
      toggleNotification({
        show: true,
        title: 'New Offer sent Failed',
        message: (error as Error).message,
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        start: '',
        pitch: '',
        price: price || '',
        newPrice: false,
      }}
      enableReinitialize
      validationSchema={toFormikValidationSchema(bidSchema)}
      validateOnMount
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} className="space-y-4 pb-20">
          <FormikFormatedTextArea
            name="pitch"
            label="Why are you perfect for this job?"
            placeholder="Why are you perfect for this job?"
          />
          <FormikCalenderInput
            name="start"
            label="When can you start?"
            placeholder="When can you start?"
          />
          <div className="bg-secondary/30 rounded-2xl p-4">
            <Typography as="p" className="text-sm text-black">
              This requester has offered{' '}
              <span className="font-bold">
                {price} ({negotiable ? 'Negotiable' : 'Not negotiable'})
              </span>{' '}
              for this request.
            </Typography>
            {negotiable ? (
              <Typography as="p" className="text-sm text-black">
                Proposes a new price if you are not comfortable with this.
              </Typography>
            ) : null}
          </div>
          {negotiable ? (
            <FormikCheckbox label="Propose new price" name="newPrice" />
          ) : null}
          {values.newPrice ? (
            <FormikInput
              name={'price'}
              label="New price"
              placeholder="New price"
              amount={true}
            />
          ) : null}
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            variant={'secondary'}
            className="w-full flex"
          >
            {isSubmitting ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              'Send Offer'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BidForm;

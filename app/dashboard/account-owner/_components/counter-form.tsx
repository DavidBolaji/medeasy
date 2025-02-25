import FormikInput from '@/app/_components/input/formik-input';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { Tooltip, message } from 'antd';
import { Form, Formik, FormikHelpers } from 'formik';
import { CheckCircle, Loader, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { counterBiderOffer } from './action';
import { useNotification } from '@/app/_hooks/use-notification';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { counterBiderOfferValueSchema } from '@/src/entities/models/bid';
import {
  createDashboardNotification,
  sendPushNotification,
} from '../../help-provider/home/action';

interface CounterFormProps {
  price: string;
  bidingId: string;
  biderId: string;
  job: string;
}

const CounterForm: React.FC<CounterFormProps> = ({
  price,
  bidingId,
  biderId,
  job,
}) => {
  const [bid, setBid] = useState(false);

  const handleBid = () => {
    setBid((prev) => !prev);
  };

  const onSubmit = async (
    values: { price: string },
    { setSubmitting }: FormikHelpers<{ price: string }>
  ) => {
    setSubmitting(true);
    const text = `New counter received: On request "${job}" new biding of ${values.price} for your request `;
    try {
      await counterBiderOffer({ bidingId, price: values.price });
      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(biderId, text, 'New Counter Biding'),
        sendPushNotification(biderId, text, 'New Counter Biding'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          'Counter Bid',
          `You submitted a counter bid of ${values.price} for job - "${job}"`
        ),
        sendPushNotification(
          undefined,
          'Counter Bid',
          `You submitted a counter bid of ${values.price} for job - "${job}"`
        ),
      ]);
      message.success('Bid created successfully');
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setSubmitting(false);
      setBid(false);
    }
  };
  return (
    <>
      {bid ? (
        <Formik
          initialValues={{
            price: price || '',
          }}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(
            counterBiderOfferValueSchema
          )}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="relative">
                <FormikInput name="price" className="w-48" amount />
                <div className="absolute top-[50%] -translate-y-[50%] flex gap-x-2 right-3">
                  {!isSubmitting ? (
                    <Tooltip title="Cancel bid" className="cursor-pointer">
                      <Button
                        className="p-0 m-0 w-4 border-none hover:border-0 hover:bg-transparent"
                        type="button"
                        onClick={handleBid}
                      >
                        <XCircle size={48} color="red" />
                      </Button>
                    </Tooltip>
                  ) : null}
                  {!isSubmitting ? (
                    <Tooltip
                      title="Submit new price"
                      className="cursor-pointer"
                    >
                      <Button
                        className="p-0 m-0 border-none hover:border-0 hover:bg-transparent"
                        type="submit"
                      >
                        <CheckCircle size={48} color="green" />
                      </Button>
                    </Tooltip>
                  ) : null}
                  {isSubmitting ? (
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                  ) : null}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex items-center gap-x-2">
          <Typography as="h4" className="text-black font-bold ">
            {price}
          </Typography>
          <Button onClick={handleBid} className="text-xs h-8">
            Counter Bid
          </Button>
        </div>
      )}
    </>
  );
};

export default CounterForm;

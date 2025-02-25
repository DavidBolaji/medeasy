import { Form, Formik, FormikHelpers } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import {
  createDashboardNotification,
  sendPushNotification,
} from '../home/action';
import { message, Tooltip } from 'antd';
import {
  counterBiderOfferValueSchema,
  ReturnGetBidingOfferForRequestSchema,
} from '@/src/entities/models/bid';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { updateBidingOfferForRequest } from './action';
import { parseCurrencyToInt } from '@/app/_lib/utils';
import FormikInput from '@/app/_components/input/formik-input';
import { Button } from '@/app/_components/ui/button';
import { CheckCircle, Loader } from 'lucide-react';
import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import Typography from '@/app/_components/typography/typography';

interface MakeNewOfferProps {
  offer: boolean;
  price: string;
  request: ReturnAllRequestSchemaType | null;
  biding: ReturnGetBidingOfferForRequestSchema;
}

const MakeNewOffer: React.FC<MakeNewOfferProps> = ({
  offer,
  price,
  request,
  biding,
}) => {
  const onSubmit = async (
    values: { price: string },
    { setSubmitting }: FormikHelpers<{ price: string }>
  ) => {
    setSubmitting(true);

    const text = `Help provider updated biding price to ${values.price} in response to you counter price of ${price}. View job "${request?.title}" and accept offer if okay with price.`;

    try {
      await updateBidingOfferForRequest({
        bidingId: biding?.id || '',
        counterPrice: parseCurrencyToInt(values.price) as number,
      });
      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(
          request?.user.id,
          text,
          'Counter Biding Updated'
        ),
        sendPushNotification(request?.user.id, text, 'Counter Biding Updated'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          `You made a new offer of ${values.price} for job - "${request?.title}"`,
          'Made new offer'
        ),
        sendPushNotification(
          undefined,
          `You made a new offer of ${values.price} for job - "${request?.title}"`,
          'Made new offer'
        ),
      ]);
      message.success('Bid price updated successfully');
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {offer && (
        <motion.div
          initial={{
            visibility: 'hidden',
            y: 0,
            opacity: 0,
          }}
          animate={{
            visibility: 'visible',
            y: 10,
            transition: { type: 'tween' },
            opacity: 1,
          }}
          exit={{
            visibility: 'hidden',
            y: -55,
            opacity: 0,
          }}
        >
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
                <Typography className="mb-1 ml-1 font-semibold">
                  Update Bid Offer
                </Typography>
                <div className="relative w-48">
                  <FormikInput name="price" className="w-48" amount />
                  <div className="absolute top-[50%] -translate-y-[50%] flex gap-x-2 right-3">
                    {!isSubmitting ? (
                      <Tooltip
                        title="Update offer price"
                        className="cursor-pointer"
                      >
                        <Button
                          className="p-0 m-0 animate-pulse border-none hover:border-0 hover:bg-transparent"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MakeNewOffer;

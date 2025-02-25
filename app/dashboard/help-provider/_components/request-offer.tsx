import { UIStates } from '@/config';
import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  getBidingOfferForRequest,
  updateBidingOfferForRequest,
} from './action';
import { CheckCircle, Loader2, Recycle, XCircle } from 'lucide-react';
import Typography from '@/app/_components/typography/typography';
import { parseIntToCurrency } from '@/app/_lib/utils';
import { Button } from '@/app/_components/ui/button';
import {
  createDashboardNotification,
  sendPushNotification,
} from '../home/action';
import { Empty, message } from 'antd';
import MakeNewOffer from './make-new-offer';

interface RequestOfferProps {
  request: ReturnAllRequestSchemaType | null;
}

const RequestOffer: React.FC<RequestOfferProps> = ({ request }) => {
  const [load, setLoad] = useState(false);
  const [offer, setOffer] = useState(false);
  const { data: biding, isPending } = useQuery({
    queryKey: [UIStates.BIDING_OFFER],
    queryFn: async () => await getBidingOfferForRequest(request?.id || ''),
    enabled: !!request?.id,
  });

  const handleAcceptBid = async () => {
    const text = `Your new bid of price ${parseIntToCurrency((biding?.counterPrice || '').toString())} has been accepted. View job "${request?.title}" and accept offer.`;
    setLoad(true);
    try {
      await updateBidingOfferForRequest({
        bidingId: biding?.id || '',
        counterPrice: biding?.counterPrice as number,
      });
      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(
          request?.user.id,
          text,
          'Counter Biding Accepted'
        ),
        sendPushNotification(request?.user.id, text, 'Counter Biding Accepted'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          'Accepted Bid',
          `You Accepted a counter bid of ${biding?.counterPrice} for job - "${request?.title}"`
        ),
        sendPushNotification(
          undefined,
          'Accepted Bid',
          `You Accepted a counter bid of ${biding?.counterPrice} for job - "${request?.title}"`
        ),
      ]);
      message.success('Bid price updated successfully');
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoad(false);
    }
  };

  if (!isPending && typeof biding === 'undefined') {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div>
      {isPending ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="animate-spin w-24 h-24 text-primary" />
        </div>
      ) : (
        <div>
          <Typography className="mb-2">
            {request?.user.fname} made a new offer of{' '}
            {parseIntToCurrency((biding?.counterPrice || '')?.toString())} while
            you had proposed{' '}
            {parseIntToCurrency((biding?.price || '').toString())}
          </Typography>
          <div className="flex gap-x-3 bg-white pb-5 relative z-50">
            <Button
              onClick={() => setOffer((prev) => !prev)}
              className="h-10 text-red-500 hover:text-red-600  hover:bg-transparent"
            >
              Make new offer
              <Recycle color="red" />
            </Button>

            <Button
              onClick={handleAcceptBid}
              className="h-10 text-green-500 hover:text-green-600 hover:bg-transparent"
            >
              {load ? (
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              ) : (
                <>
                  Accept Offer
                  <CheckCircle color="green" />
                </>
              )}
            </Button>
          </div>
          <MakeNewOffer
            offer={offer}
            price={parseIntToCurrency((biding?.price || '').toString())}
            request={request}
            biding={biding}
          />
        </div>
      )}
    </div>
  );
};

export default RequestOffer;

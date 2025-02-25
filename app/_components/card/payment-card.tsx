'use client';
import { Info, Loader } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import PaymentComponent from '../paystack';
import { useQueryClient } from '@tanstack/react-query';
import { paystackKey } from '@/app/_hooks/use-paystack';
import { updateBiderOffer } from '@/app/dashboard/account-owner/_components/modal/action';
import { useParams } from 'next/navigation';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import useAcceptOfferModal from '@/app/dashboard/account-owner/_hooks/use-accept-offer-modal';
import { useCallback, useState } from 'react';
import { parseIntToCurrency } from '@/app/_lib/utils';
import { Images } from '@/app/_constants/images';
import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import {
  createDashboardNotification,
  sendPushNotification,
} from '@/app/dashboard/help-provider/home/action';
import { useNotification } from '@/app/_hooks/use-notification';

interface PaymentCardProps {
  biders: RequestBiderSchemaType[] | [];
  request: ReturnSingleRequestSchemaType | null;
}

export default function PaymentCard({ biders, request }: PaymentCardProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const { open, onOpenChange } = useAcceptOfferModal();
  const { toggleNotification } = useNotification();
  const [load, setLoad] = useState(false);
  const selectedBider = biders?.find((bider) => open?.id === bider?.id) || null;

  const handleAcceptOffer = async () => {
    setLoad(true);
    const text = `Your offer for "${request?.title}" has been accepted.`;
    try {
      await updateBiderOffer({
        requestId: params.requestId as string,
        acceptedBiderId: selectedBider?.id || '',
        finalPrice: selectedBider?.price as number,
        stage: 'ONGOING',
      });
      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(
          selectedBider?.user.id,
          text,
          'Offer Accepted'
        ),
        sendPushNotification(selectedBider?.user.id, text, 'Offer Accepted'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          'Request',
          `You have succefully engaged help-provider for job - "${request?.title}"`
        ),
        sendPushNotification(
          undefined,
          'Request',
          `You have succefully engaged help-provider for job - "${request?.title}"`
        ),
      ]);
      onOpenChange('');
      toggleNotification({
        type: 'success',
        title: "'Request",
        message: `You have succefully engaged help-provider for job - "${request?.title}"`,
        show: true,
      });
    } catch (error) {
      onOpenChange('');
      toggleNotification({
        type: 'error',
        title: 'Request Error',
        message: (error as Error).message,
        show: true,
      });
    } finally {
      setLoad(false);
    }
  };

  const handlePayment = useCallback((email: string) => {
    queryClient.setQueryData(['PAYSTACK_MODAL'], () => ({
      amount: (selectedBider?.price || 0) * 100,
      email: email,
      shown: true,
      publicKey: paystackKey,
      reference: Date.now().toString(),
    }));
  }, []);

  return (
    <Card className="w-full max-w-md bg-white rounded-2xl">
      <CardContent className="px-6">
        <div className="space-y-6 pt-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-[#5C698A] font-instrument font-medium">
                Payment for request
              </div>
              <div className="font-medium">
                Help Needed: {selectedBider?.request.service}
              </div>
            </div>
            <div className="font-bold font-instrument">
              {parseIntToCurrency(selectedBider?.price.toString() || '')}
            </div>
          </div>

          <div className="space-y-3 border-t border-b py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-base text-black font-medium font-instrument">
                  Service fee
                </span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-base text-black font-medium font-instrument">
                {parseIntToCurrency('0')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-base text-black font-medium font-instrument">
                  VAT
                </span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-base text-black font-medium font-instrument">
                {parseIntToCurrency('0')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-6 border-b">
          <span className="font-bold font-instrument text-xl">Total</span>
          <span className="font-bold font-instrument text-xl">
            {parseIntToCurrency(selectedBider?.price.toString() || '')}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-6 space-y-4 flex-col">
        <Button
          onClick={() => handlePayment(request?.user?.email || '')}
          variant={'secondary'}
          className="w-full"
        >
          <span className="flex-1">Pay with Debit Card</span>
          {load ? (
            <Loader className="w-8 h-8 animate-spin text-white" />
          ) : (
            <Image src={Images.MasterCard} alt="master-card" />
          )}
        </Button>

        <p className="text-center text-sm font-medium pt-6 pb-8 font-instrument text-[#5C698A]">
          Payments are held secured with MedEasy until request is fulfilled.
        </p>
      </CardFooter>
      <PaymentComponent onSuccess={handleAcceptOffer} />
    </Card>
  );
}

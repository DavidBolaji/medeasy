'use client';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { updateBiderOffer } from './modal/action';
import { Loader2 } from 'lucide-react';
import {
  createDashboardNotification,
  sendPushNotification,
} from '../../help-provider/home/action';
import { message } from 'antd';

const BottomButtons = () => {
  const [load, setLoad] = useState(false);
  const params = useParams();
  const isViewPage = !!params?.requestId?.length;

  const handleCancel = async () => {
    setLoad(true);
    try {
      await updateBiderOffer({
        stage: 'CANCELLED',
        requestId: (params?.requestId as string) || '',
        finalPrice: 0,
      });
      await Promise.allSettled([
        createDashboardNotification(
          undefined,
          'Request Cancelled',
          `You have succefully cancelled request`
        ),
        sendPushNotification(
          undefined,
          'Request Cancelled',
          `You have succefully cancelled request`
        ),
      ]);
      message.success('Request has been cancelled successfully');
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoad(false);
    }
  };

  if (isViewPage) {
    return (
      <div
        onClick={handleCancel}
        className="sticky bottom-0 md:hidden flex h-20 items-center justify-center bg-primary px-5"
      >
        <Button className="w-full bg-white border-0 hover:border-white hover:border">
          {load ? (
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          ) : (
            'Cancel help'
          )}
        </Button>
      </div>
    );
  }
  return (
    <div className="sticky bottom-0 md:hidden flex h-20 items-center justify-center bg-white px-5">
      <Button className="w-full" variant={'secondary'} asChild>
        <Link href="/dashboard/account-owner/home/create">
          Request for help
        </Link>
      </Button>
    </div>
  );
};

export default BottomButtons;

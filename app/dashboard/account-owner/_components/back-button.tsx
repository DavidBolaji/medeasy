'use client';
import { Button } from '@/app/_components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { updateBiderOffer } from './modal/action';
import {
  createDashboardNotification,
  sendPushNotification,
} from '../../help-provider/home/action';
import { message } from 'antd';

const BackButton: React.FC<{ isCompleted?: boolean }> = ({
  isCompleted = false,
}) => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const params = useParams();

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
  return (
    <div className="h-full flex items-center justify-between">
      <Button
        onClick={() => router.back()}
        className="flex items-center h-full border-0 text-white"
      >
        <ChevronLeft />
        <span>Back</span>
      </Button>
      {!isCompleted ? (
        <Button
          onClick={handleCancel}
          className="md:flex items-center border-0 text-black bg-white hidden"
        >
          {load ? (
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          ) : (
            'Cancel help'
          )}
        </Button>
      ) : null}
    </div>
  );
};

export default BackButton;

'use client';

import { Loader, UserIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import Typography from '@/app/_components/typography/typography';

import { StyledMobileDrawer } from './drawer.style';
import { Grid } from 'antd';
import useViewOfferModal from '../../_hooks/use-view-offer-modal';
import {
  ReturnRequestSchemaType,
  ReturnSingleRequestSchemaType,
} from '@/src/entities/models/requests';
import RequestDetails from '@/app/dashboard/help-provider/_components/request-details';
import { updateBiderOffer } from './action';
import { useState } from 'react';
import {
  createDashboardNotification,
  sendPushNotification,
} from '@/app/dashboard/help-provider/home/action';
import { useNotification } from '@/app/_hooks/use-notification';
const { useBreakpoint } = Grid;

export default function ViewOfferDrawer() {
  const screen = useBreakpoint();
  const { open, onOpenChange } = useViewOfferModal();
  const { toggleNotification } = useNotification();
  const [load, setLoad] = useState(false);

  const selectedBider = open?.data?.bider;
  const selectedRequest = open?.data?.request;

  const handleComplete = async () => {
    setLoad(true);
    const text = `Job request of "${selectedRequest?.title}" has been successfully completed.`;
    try {
      await updateBiderOffer({
        stage: 'COMPLETED',
        acceptedBiderId: open?.data.acceptedBiderId || '',
        requestId: open?.data.requestId || '',
        finalPrice: open?.data.finalPrice as number,
      });

      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(
          selectedBider?.userId,
          text,
          'Offer Completed'
        ),
        sendPushNotification(selectedBider?.userId, text, 'Offer Completed'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          'Request completed',
          `Job - "${selectedRequest?.title}" has been successfully completed`
        ),
        sendPushNotification(
          undefined,
          'Request completed',
          `Job - "${selectedRequest?.title}" has been successfully completed`
        ),
      ]);
      onOpenChange(null);
      toggleNotification({
        type: 'success',
        title: 'Request Completed',
        message: `Job - "${selectedRequest?.title}" has been successfully completed`,
        show: true,
      });
    } catch (error) {
      onOpenChange(null);
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

  const handleCancel = async () => {
    setLoad(true);
    const text = `Job request of "${selectedRequest?.title}" has been cancelled.`;
    try {
      await updateBiderOffer({
        stage: 'CANCELLED',
        acceptedBiderId: open?.data.acceptedBiderId || '',
        requestId: open?.data.requestId || '',
        finalPrice: open?.data.finalPrice as number,
      });
      await Promise.allSettled([
        // send notification for request user
        createDashboardNotification(
          selectedBider?.userId,
          text,
          'Offer Cancelled'
        ),
        sendPushNotification(selectedBider?.userId, text, 'Offer Cancelled'),
        // send notification to current user
        createDashboardNotification(
          undefined,
          'Request completed',
          `Job - "${selectedRequest?.title}" has been cancelled`
        ),
        sendPushNotification(
          undefined,
          'Request completed',
          `Job - "${selectedRequest?.title}" has been cancelled`
        ),
      ]);
      onOpenChange(null);
      toggleNotification({
        type: 'success',
        title: 'Request Cancelled',
        message: `Job - "${selectedRequest?.title}" has been cancelled`,
        show: true,
      });
    } catch (error) {
      onOpenChange(null);
      toggleNotification({
        type: 'error',
        title: 'Request Cancel Error',
        message: (error as Error).message,
        show: true,
      });
    } finally {
      setLoad(false);
    }
  };

  return !screen.lg ? (
    <StyledMobileDrawer
      open={open?.shown}
      onClose={() =>
        onOpenChange({
          request: selectedRequest as ReturnRequestSchemaType,
          bider: {
            fname: selectedBider?.fname || '',
            lname: selectedBider?.lname || '',
            userId: selectedBider?.userId || '',
          },
          acceptedBiderId: open?.data.acceptedBiderId || '',
          requestId: open?.data.requestId || '',
          finalPrice: open?.data.finalPrice as number,
        })
      }
      placement="bottom"
      height={'90%'}
      closeIcon={null}
      width={485}
      footer={
        <div className="w-full space-y-4 h-40 pt-2 px-4">
          <Button
            onClick={handleCancel}
            variant={'default'}
            disabled={load}
            className="w-full hover:text-white border-red-700 text-red-700 hover:bg-red-700 hover:border-0"
          >
            Cancel help
          </Button>
          <Button
            disabled={load}
            onClick={handleComplete}
            variant={'secondary'}
            className="w-full"
          >
            {load ? (
              <Loader className="w-8 h-8 text-white animate-spin" />
            ) : (
              'Mark as complete'
            )}
          </Button>
        </div>
      }
    >
      <div className="md:block p-0 bg-white rounded-2xl">
        <div className="pt-10 px-5 pb-10">
          <div className="">
            <div>
              <Typography className="text-[#5C698A] font-medium text-sm mb-2">
                Help Provider
              </Typography>
              <div className="flex border-b items-center gap-2 pb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage alt={`${selectedBider?.fname}`} />
                  <AvatarFallback className="bg-[#5C698A]">
                    <UserIcon color="white" />
                  </AvatarFallback>
                </Avatar>
                <Typography className="text-black font-bold text-xl underline">
                  {selectedBider?.fname} {selectedBider?.lname}
                </Typography>
              </div>
              <Typography className="text-[#5C698A] font-medium text-sm mb-2 mt-6">
                Support
              </Typography>
            </div>
          </div>
          <div className="h-[250px] overflow-y-auto scrollbar-hide pb-20 ">
            <RequestDetails
              request={
                selectedRequest as unknown as ReturnSingleRequestSchemaType
              }
            />
          </div>
        </div>
      </div>
    </StyledMobileDrawer>
  ) : null;
}

'use client';

import React from 'react';
import Typography from '@/app/_components/typography/typography';

import { Loader2 } from 'lucide-react';
import useCancelModal from '../_hooks/use-cancel-modal';
import { Button } from '@/app/_components/ui/button';
import { StyledModal } from '../../../user-management/verify/[verifyUserId]/_components/styled.modal';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { updateBiderOffer } from '@/app/dashboard/account-owner/_components/modal/action';

export const CancelRequestModal = () => {
  const { onClose, open } = useCancelModal();
  const params = useParams();

  const { mutate, isPending } = useMutation({
    mutationKey: ['CANCEL_REQUEST'],
    mutationFn: async () =>
      await updateBiderOffer({
        stage: 'CANCELLED',
        requestId: (params?.requestId as string) || '',
        finalPrice: 0,
      }),
  });

  return (
    <StyledModal
      closable
      onCancel={onClose}
      open={open}
      footer={null}
      onClose={close}
    >
      <Typography className="text-medium text-2xl mb-2 text-black">
        Confirm Cancel
      </Typography>
      <Typography className="font-normal text-base mb-4">
        Are you sure you want to cancel request?
      </Typography>
      <div className="flex items-center gap-4">
        <Button
          className="font-instrument hover:border-primary"
          disabled={isPending}
          onClick={onClose}
        >
          Back
        </Button>
        <Button
          className="bg-red-500 border-white hover:border font-instrument text-white hover:text-black hover:border-red-500 hover:bg-transparent"
          disabled={isPending}
          onClick={() => mutate()}
          type="button"
        >
          {isPending ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            'Cancel'
          )}
        </Button>
      </div>
    </StyledModal>
  );
};

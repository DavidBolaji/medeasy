'use client';

import React, { useState } from 'react';
import { StyledModal } from './styled.modal';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { updateUserVerification } from './action';
import { useNotification } from '@/app/_hooks/use-notification';
import { Loader2 } from 'lucide-react';
import useRejectModal from '../_hooks/use-reject-modal';
import { useParams } from 'next/navigation';

const RejectModal = () => {
  const { open, onCloseReject } = useRejectModal();
  const [load, setLoad] = useState(false);
  const { toggleNotification } = useNotification();
  const params = useParams<{ verifyUserId: string }>();
  const userId = params.verifyUserId;

  const handleReject = async () => {
    setLoad(true);
    const response = await updateUserVerification({
      userId,
      verified: 'FALSE',
    });
    if (!response.success) {
      setLoad(false);
      onCloseReject();
      return toggleNotification({
        show: true,
        title: 'Update error',
        message: response?.error || '',
        type: 'error',
      });
    }
    setLoad(false);
    onCloseReject();
    return toggleNotification({
      show: true,
      title: 'Update Success',
      message: 'User account rejected successfully',
      type: 'success',
    });
  };

  return (
    <StyledModal
      closable
      onCancel={onCloseReject}
      open={open}
      footer={null}
      onClose={onCloseReject}
    >
      <Typography className="text-medium text-2xl mb-2 text-black">
        Confirm account rejection
      </Typography>
      <Typography className="font-normal text-base mb-4">
        Are you sure you want to reject this account?
      </Typography>
      <div className="flex items-center gap-4">
        <Button
          className="font-instrument hover:border-primary"
          disabled={load}
          onClick={onCloseReject}
        >
          Back
        </Button>
        <Button
          className="bg-red-500 border-white hover:border font-instrument text-white hover:text-black hover:border-red-500 hover:bg-transparent"
          disabled={load}
          onClick={handleReject}
          type="button"
        >
          {load ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            'Reject account'
          )}
        </Button>
      </div>
    </StyledModal>
  );
};

export default RejectModal;

'use client';
import React, { useState } from 'react';
import { StyledModal } from './styled.modal';
import useVerifyModal from '../_hooks/use-verify-modal';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { updateUserVerification } from './action';
import { useNotification } from '@/app/_hooks/use-notification';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const VerifyModal = () => {
  const { open, onClose } = useVerifyModal();
  const [load, setLoad] = useState(false);
  const { toggleNotification } = useNotification();
  const params = useParams<{ verifyUserId: string }>();
  const userId = params.verifyUserId;

  const handleVerify = async () => {
    setLoad(true);
    const response = await updateUserVerification({
      userId,
      verified: 'TRUE',
    });
    if (!response.success) {
      setLoad(false);
      onClose();
      return toggleNotification({
        show: true,
        title: 'Update error',
        message: response?.error || '',
        type: 'error',
      });
    }
    setLoad(false);
    onClose();
    return toggleNotification({
      show: true,
      title: 'Update Success',
      message: 'User account verified successfully',
      type: 'success',
    });
  };
  return (
    <StyledModal
      closable
      onCancel={onClose}
      footer={null}
      open={open}
      onClose={onClose}
    >
      <Typography className="text-medium text-2xl mb-2 text-black">
        Confirm account approval
      </Typography>
      <Typography className="font-normal text-base mb-4">
        Are you sure you want to approve this account?
      </Typography>
      <div className="flex items-center gap-4">
        <Button
          className="hover:border-primary"
          disabled={load}
          onClick={onClose}
        >
          Back
        </Button>
        <Button
          variant={'secondary'}
          disabled={load}
          onClick={handleVerify}
          type="button"
        >
          {load ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            'Approve account'
          )}
        </Button>
      </div>
    </StyledModal>
  );
};

export default VerifyModal;

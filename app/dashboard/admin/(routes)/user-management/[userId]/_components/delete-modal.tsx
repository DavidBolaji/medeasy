'use client';

import React, { useState } from 'react';

import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { deleteUserAccount } from './action';
import { useNotification } from '@/app/_hooks/use-notification';
import { Loader2 } from 'lucide-react';

import { useParams } from 'next/navigation';
import useDeleteModal from '../_hooks/use-delete-modal';
import { StyledModal } from '../../verify/[verifyUserId]/_components/styled.modal';

const DeleteModal = () => {
  const { open, onCloseDelete } = useDeleteModal();
  const [load, setLoad] = useState(false);
  const { toggleNotification } = useNotification();
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const handleDelete = async () => {
    setLoad(true);
    const response = await deleteUserAccount(userId);
    if (!response.success) {
      setLoad(false);
      onCloseDelete();
      return toggleNotification({
        show: true,
        title: 'Delete Error',
        message: response?.error || '',
        type: 'error',
      });
    }
    setLoad(false);
    onCloseDelete();
    return toggleNotification({
      show: true,
      title: 'Delete Success',
      message: 'User account has been deleted successfully',
      type: 'success',
    });
  };

  return (
    <StyledModal
      closable
      onCancel={onCloseDelete}
      open={open}
      footer={null}
      onClose={onCloseDelete}
    >
      <Typography className="text-medium text-2xl mb-2 text-black">
        Confirm account Deletion
      </Typography>
      <Typography className="font-normal text-base mb-4">
        Are you sure you want to delete this account?
      </Typography>
      <div className="flex items-center gap-4">
        <Button
          className="font-instrument hover:border-primary"
          disabled={load}
          onClick={onCloseDelete}
        >
          Back
        </Button>
        <Button
          className="bg-red-500 border-white hover:border font-instrument text-white hover:text-black hover:border-red-500 hover:bg-transparent"
          disabled={load}
          onClick={handleDelete}
          type="button"
        >
          {load ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            'Delete account'
          )}
        </Button>
      </div>
    </StyledModal>
  );
};

export default DeleteModal;

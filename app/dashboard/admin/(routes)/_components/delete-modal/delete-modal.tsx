'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteModal } from '../table/hooks/use-delete-modal';
import Typography from '@/app/_components/typography/typography';
import { StyledModal } from '../../user-management/verify/[verifyUserId]/_components/styled.modal';
import { Button } from '@/app/_components/ui/button';
import { Loader2 } from 'lucide-react';

export const DeleteModal = () => {
  const queryClient = useQueryClient();
  const { deleteModal, toggleModal, deleteItem, isPending } = useDeleteModal();

  const close = () => {
    queryClient.setQueryData(['OVERLAY'], () => false);
    toggleModal(false, 'DELETE_MODAL', new Set([]));
  };

  const deleteAll = async () => {
    await deleteItem();
  };

  return (
    <StyledModal
      closable
      onCancel={close}
      open={deleteModal?.shown}
      footer={null}
      onClose={close}
    >
      <Typography className="text-medium text-2xl mb-2 text-black">
        Confirm Deletion
      </Typography>
      <Typography className="font-normal text-base mb-4">
        Are you sure you want to delete?
      </Typography>
      <div className="flex items-center gap-4">
        <Button
          className="font-instrument hover:border-primary"
          disabled={isPending}
          onClick={close}
        >
          Back
        </Button>
        <Button
          className="bg-red-500 border-white hover:border font-instrument text-white hover:text-black hover:border-red-500 hover:bg-transparent"
          disabled={isPending}
          onClick={deleteAll}
          type="button"
        >
          {isPending ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            'Delete'
          )}
        </Button>
      </div>
    </StyledModal>
  );
};

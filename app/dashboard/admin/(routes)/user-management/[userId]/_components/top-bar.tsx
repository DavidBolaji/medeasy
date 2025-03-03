'use client';
import React from 'react';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import useDeleteModal from '../_hooks/use-delete-modal';

const TopBar = () => {
  const { onOpenDelete } = useDeleteModal();
  const handleDelete = () => {
    onOpenDelete();
  };
  return (
    <div className="flex w-full h-16 lg:px-12 items-center justify-between bg-primary">
      <Typography className="text-white font-semibold text-xl">
        Profile
      </Typography>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleDelete}
          className="bg-white border-primary hover:border font-instrument text-sm hover:border-white"
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default TopBar;

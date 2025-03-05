'use client';
import React from 'react';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import useVerifyModal from '../_hooks/use-verify-modal';
import useRejectModal from '../_hooks/use-reject-modal';

const TopBar = () => {
  const { onOpen } = useVerifyModal();
  const { onOpenReject } = useRejectModal();

  return (
    <div className="flex w-full h-16 lg:ml-3 lg:px-8 px-2 items-center justify-between bg-primary">
      <Typography className="text-white font-semibold text-xl">
        Verify User
      </Typography>
      <div className="flex items-center gap-2">
        <Button
          onClick={onOpenReject}
          variant={'outline'}
          className="border-white hover:bg-white hover:border-white text-sm font-instrument text-white"
        >
          Reject account
        </Button>
        <Button
          onClick={onOpen}
          className="bg-white border-primary hover:border font-instrument text-sm hover:border-white"
        >
          Approve account
        </Button>
      </div>
    </div>
  );
};

export default TopBar;

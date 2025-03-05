'use client';
import React from 'react';
import Typography from '@/app/_components/typography/typography';
import { Button } from '@/app/_components/ui/button';
import { Stage } from '@prisma/client';
import useCancelModal from '../_hooks/use-cancel-modal';

const TopBar: React.FC<{ request: Stage }> = ({ request }) => {
  const { onOpen } = useCancelModal();
  return (
    <div className="flex w-full h-16 lg:px-12 px-2 items-center justify-between bg-primary">
      <Typography className="text-white font-semibold text-xl">
        Request Details
      </Typography>
      <div className="flex items-center gap-2">
        <Button
          disabled={request === 'CANCELLED' || request === 'ONGOING'}
          onClick={onOpen}
          className="bg-white border-primary disabled:cursor-not-allowed hover:border font-instrument text-sm hover:border-white"
        >
          Cancel Request
        </Button>
      </div>
    </div>
  );
};

export default TopBar;

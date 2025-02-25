'use client';
import React from 'react';
import { Button } from '../ui/button';
import useHelpproviderModal from '@/app/dashboard/help-provider/_hooks/use-help-provider-modal';
import { useSearchParams } from 'next/navigation';

interface ViewRequestCardButtonProps {
  id: string;
}

const ViewRequestCardButton: React.FC<ViewRequestCardButtonProps> = ({
  id,
}) => {
  const { onOpenChange } = useHelpproviderModal();
  const searchParams = useSearchParams();
  const isOngoing = searchParams.get('active');

  return isOngoing !== 'ongoing' ? (
    <Button
      type="button"
      variant={'outline'}
      className="h-10"
      onClick={() => onOpenChange(id)}
    >
      View Request
    </Button>
  ) : null;
};

export default ViewRequestCardButton;

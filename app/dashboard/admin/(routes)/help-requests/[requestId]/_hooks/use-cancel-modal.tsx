'use client';

import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useCancelModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.CANCEL_MODAL])) {
    queryClient.setQueryData([UIStates.CANCEL_MODAL], false);
  }

  const onOpen = () => {
    queryClient.setQueryData([UIStates.CANCEL_MODAL], true);
  };

  const onClose = () => {
    queryClient.setQueryData([UIStates.CANCEL_MODAL], false);
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.CANCEL_MODAL],
    queryFn: () => queryClient.getQueryData([UIStates.CANCEL_MODAL]) as boolean,
  });

  return { open, onOpen, onClose };
};

export default useCancelModal;

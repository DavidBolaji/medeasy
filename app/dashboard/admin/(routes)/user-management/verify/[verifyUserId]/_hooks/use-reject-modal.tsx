'use client';

import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useRejectModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.REJECT_MODAL])) {
    queryClient.setQueryData([UIStates.REJECT_MODAL], false);
  }

  const onOpenReject = () => {
    queryClient.setQueryData([UIStates.REJECT_MODAL], true);
  };

  const onCloseReject = () => {
    queryClient.setQueryData([UIStates.REJECT_MODAL], false);
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.REJECT_MODAL],
    queryFn: () => queryClient.getQueryData([UIStates.REJECT_MODAL]) as boolean,
  });

  return { open, onOpenReject, onCloseReject };
};

export default useRejectModal;

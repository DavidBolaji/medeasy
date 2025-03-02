'use client';

import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useVerifyModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.VERIFY_MODAL])) {
    queryClient.setQueryData([UIStates.VERIFY_MODAL], false);
  }

  const onOpen = () => {
    queryClient.setQueryData([UIStates.VERIFY_MODAL], true);
  };

  const onClose = () => {
    queryClient.setQueryData([UIStates.VERIFY_MODAL], false);
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.VERIFY_MODAL],
    queryFn: () => queryClient.getQueryData([UIStates.VERIFY_MODAL]) as boolean,
  });

  return { open, onOpen, onClose };
};

export default useVerifyModal;

'use client';

import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useDeleteModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.DELETE_MODAL])) {
    queryClient.setQueryData([UIStates.DELETE_MODAL], false);
  }

  const onOpenDelete = () => {
    queryClient.setQueryData([UIStates.DELETE_MODAL], true);
  };

  const onCloseDelete = () => {
    queryClient.setQueryData([UIStates.DELETE_MODAL], false);
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.DELETE_MODAL],
    queryFn: () => queryClient.getQueryData([UIStates.DELETE_MODAL]) as boolean,
  });

  return { open, onOpenDelete, onCloseDelete };
};

export default useDeleteModal;

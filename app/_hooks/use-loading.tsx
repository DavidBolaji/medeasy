import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBanks } from '../_components/forms/auth/actions';
import { useCallback } from 'react';

const useLoading = () => {
  const queryClient = useQueryClient();

  // Initialize LOADING query data if not set already
  if (!queryClient.getQueryData([UIStates.LOADING])) {
    queryClient.setQueryData([UIStates.LOADING], () => false);
  }

  const { data: loading } = useQuery({
    queryKey: [UIStates.LOADING],
    queryFn: () => queryClient.getQueryData([UIStates.LOADING]) as boolean,
  });

  const setLoading = (state: boolean) => {
    queryClient.setQueryData([UIStates.LOADING], state);
  };

  return { loading, setLoading };
};

export default useLoading;

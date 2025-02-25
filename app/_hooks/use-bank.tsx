import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBanks } from '../_components/forms/auth/actions';
import { useCallback, useEffect, useMemo } from 'react';

const useBank = () => {
  const queryClient = useQueryClient();

  // Initialize BANKS query data if not set already
  if (!queryClient.getQueryData([UIStates.BANKS])) {
    queryClient.setQueryData([UIStates.BANKS], () => null);
  }

  const { data: bankList } = useQuery({
    queryKey: [UIStates.BANKS],
    queryFn: () =>
      queryClient.getQueryData([UIStates.BANKS]) as {
        key: string;
        label: string;
      }[],
    staleTime: 1000 * 60 * 60, // 1 hour (adjust based on your use case)
  });

  const getAllBanks = useCallback(async () => {
    // Only fetch data if not already available in the cache
    const cachedBanks = queryClient.getQueryData([UIStates.BANKS]);
    if (!cachedBanks) {
      const banks = await getBanks();
      queryClient.setQueryData([UIStates.BANKS], banks);
    }
  }, [queryClient]);

  useEffect(() => {
    // Fetch the banks only on mount (if not already in the cache)
    if (!bankList) {
      getAllBanks();
    }
  }, [bankList, getAllBanks]);

  // Memoize the bank list to avoid unnecessary recalculation
  const memoizedBankList = useMemo(() => {
    return bankList || [];
  }, [bankList]);

  return { bankList: memoizedBankList };
};

export default useBank;

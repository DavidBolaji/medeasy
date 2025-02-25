'use client';
import { UIStates } from '@/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getState } from '../_lib/utils';

const useAddress = () => {
  const queryClient = useQueryClient();

  const { data: countries } = useQuery({
    queryKey: [UIStates.COUNTRIES],
    queryFn: async () =>
      queryClient.setQueryData([UIStates.COUNTRIES], () => [
        { label: 'Nigeria', key: 'Nigeria' },
      ]) as { label: string; key: string }[],
  });

  const { data } = useQuery({
    queryKey: [UIStates.STATES],
    queryFn: async () => queryClient.getQueryData([UIStates.STATES]) ?? [],
  });

  const { mutate: getStates } = useMutation({
    mutationKey: [UIStates.STATES],
    mutationFn: async (country: string) => {
      return getState(country);
    },
    onSuccess: (res) => {
      const format = res.map((e: any) => ({
        key: e.name,
        label: e.name,
      }));
      return queryClient.setQueryData([UIStates.STATES], format);
    },
  });

  const states = data || [];

  return {
    countries,
    getStates,
    states,
  };
};

export default useAddress;

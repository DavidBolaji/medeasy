'use client';
import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useDashboardNotification = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData([UIStates.DASHBOARD_NOTIFICATION_DRAWER])) {
    queryClient.setQueryData([UIStates.DASHBOARD_NOTIFICATION_DRAWER], false);
  }

  const toggleNotification = (data: boolean) => {
    queryClient.setQueryData(
      [UIStates.DASHBOARD_NOTIFICATION_DRAWER],
      () => data
    );
  };

  const close = () => {
    queryClient.setQueryData([UIStates.DASHBOARD_NOTIFICATION_DRAWER], false);
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.DASHBOARD_NOTIFICATION_DRAWER],
    queryFn: () =>
      queryClient.getQueryData([
        UIStates.DASHBOARD_NOTIFICATION_DRAWER,
      ]) as boolean,
    staleTime: Infinity,
  });
  return { toggleNotification, open, close };
};

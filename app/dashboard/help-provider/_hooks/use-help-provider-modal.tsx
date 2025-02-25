import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useHelpproviderModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.REQUEST_HELP_PROVIDER_MODAL])) {
    queryClient.setQueryData([UIStates.REQUEST_HELP_PROVIDER_MODAL], () => ({
      shown: false,
      id: '',
    }));
  }

  const onOpenChange = (id: string) => {
    queryClient.setQueryData(
      [UIStates.REQUEST_HELP_PROVIDER_MODAL],
      (prev: { shown: boolean; id: string }) => ({
        shown: !prev.shown,
        id,
      })
    );
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.REQUEST_HELP_PROVIDER_MODAL],
    queryFn: () =>
      queryClient.getQueryData([UIStates.REQUEST_HELP_PROVIDER_MODAL]) as {
        shown: boolean;
        id: string;
      },
  });

  return { open, onOpenChange };
};

export default useHelpproviderModal;

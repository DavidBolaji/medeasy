import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useAcceptOfferModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.ACCEPT_OFFER_MODAL])) {
    queryClient.setQueryData([UIStates.ACCEPT_OFFER_MODAL], () => ({
      shown: false,
      id: '',
    }));
  }

  const onOpenChange = (id: string) => {
    queryClient.setQueryData(
      [UIStates.ACCEPT_OFFER_MODAL],
      (prev: { shown: boolean; id: string }) => ({
        shown: !prev.shown,
        id,
      })
    );
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.ACCEPT_OFFER_MODAL],
    queryFn: () =>
      queryClient.getQueryData([UIStates.ACCEPT_OFFER_MODAL]) as {
        shown: boolean;
        id: string;
      },
  });

  return { open, onOpenChange };
};

export default useAcceptOfferModal;

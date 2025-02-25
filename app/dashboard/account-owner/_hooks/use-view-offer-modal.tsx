import { UIStates } from '@/config';
import { ReturnRequestSchemaType } from '@/src/entities/models/requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type IData = {
  request: ReturnRequestSchemaType;
  bider: { fname: string; lname: string; userId: string };
  acceptedBiderId: string;
  requestId: string;
  finalPrice: number;
};

const useViewOfferModal = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.VIEW_OFFER_MODAL])) {
    queryClient.setQueryData([UIStates.VIEW_OFFER_MODAL], () => ({
      shown: false,
      data: null,
    }));
  }

  const onOpenChange = (data: IData | null) => {
    queryClient.setQueryData(
      [UIStates.VIEW_OFFER_MODAL],
      (prev: { shown: boolean; data: IData }) => ({
        shown: !prev.shown,
        data,
      })
    );
  };

  const { data: open } = useQuery({
    queryKey: [UIStates.VIEW_OFFER_MODAL],
    queryFn: () =>
      queryClient.getQueryData([UIStates.VIEW_OFFER_MODAL]) as {
        shown: boolean;
        data: IData;
      },
  });

  return { open, onOpenChange };
};

export default useViewOfferModal;

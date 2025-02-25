import { UIStates } from '@/config';
import { RequestSchemaType } from '@/src/entities/models/requests';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const useRequest = () => {
  const queryClient = useQueryClient();

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.REQUEST])) {
    queryClient.setQueryData([UIStates.REQUEST], () => null);
  }

  const insert = <T,>(values: T) => {
    queryClient.setQueryData([UIStates.REQUEST], (prev: T) => {
      if (!prev) return { ...values };
      return {
        ...prev,
        ...values,
      };
    });
  };

  const { data: requestData } = useQuery({
    queryKey: [UIStates.REQUEST],
    queryFn: () =>
      queryClient.getQueryData([UIStates.REQUEST]) as RequestSchemaType,
  });

  return { requestData, insert };
};

export default useRequest;

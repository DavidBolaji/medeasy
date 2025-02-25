'use client';

import { UIStates } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const ClearRegister = () => {
  const queryClient = useQueryClient();
  useQuery({
    queryKey: [UIStates.REGISTER],
    queryFn: () => queryClient.setQueryData([UIStates.REGISTER], () => null),
  });
  return null;
};

export default ClearRegister;

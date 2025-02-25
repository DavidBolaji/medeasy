import { UIStates } from '@/config';
import { allSignUpSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getRole } from '../_lib/utils';

const useSignUp = () => {
  const queryClient = useQueryClient();
  const path = usePathname();
  const role = getRole(path);

  // Initialize REGISTER query data if not set already
  if (!queryClient.getQueryData([UIStates.REGISTER])) {
    queryClient.setQueryData([UIStates.REGISTER], () => null);
  }

  const insert = <T,>(values: T) => {
    queryClient.setQueryData([UIStates.REGISTER], (prev: T) => {
      if (!prev) return { ...values };
      return {
        ...prev,
        ...values,
      };
    });
  };

  const getSignUpData = <
    T extends Record<
      string,
      | string
      | { certificate: string; name: string }[]
      | { name: string; duration: string; experience: string }[]
      | boolean
    >,
  >(
    data: string[]
  ): T => {
    const initialValue: Record<
      string,
      | string
      | { certificate: string; name: string }[]
      | { name: string; duration: string; experience: string }[]
      | { name: string }[]
      | boolean
    > = {};

    for (const char of data) {
      if (signUpData && typeof signUpData === 'object' && char in signUpData) {
        //@ts-ignore
        initialValue[char] = signUpData[char as keyof typeof signUpData] || '';
      } else {
        if (char === 'confirm_password') {
          initialValue[char] = signUpData?.password || '';
        } else if (char === 'certifications') {
          initialValue[char] = [
            {
              certificate: '',
              name: '',
            },
          ];
        } else if (char === 'services') {
          if (role !== 'AccountOwner') {
            initialValue[char] = [
              {
                experience: '',
                duration: '',
                name: '',
              },
            ];
          } else {
            initialValue[char] = [
              {
                name: '',
              },
            ];
          }
        } else {
          initialValue[char] = '';
        }
      }
    }
    return initialValue as T;
  };

  const { data: signUpData } = useQuery({
    queryKey: [UIStates.REGISTER],
    queryFn: () =>
      queryClient.getQueryData([UIStates.REGISTER]) as allSignUpSchemaType,
  });

  return { signUpData, insert, getSignUpData };
};

export default useSignUp;

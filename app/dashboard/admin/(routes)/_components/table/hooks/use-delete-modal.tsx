'use client';
import { useNotification } from '@/app/_hooks/use-notification';
import { UIStates } from '@/config';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { deleteRequest, deleteUsers } from './action';
import { filterRequest } from '../request-table/action';
import { filterCustomer } from '../customer-table/action';

export const deleteHash = {
  DELETE_REQUEST: deleteRequest,
  DELETE_USERS: deleteUsers,
};

export const useDeleteModal = () => {
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const searchParams = useSearchParams();

  if (!queryClient.getQueryData([UIStates.DELETE_REQUEST_MODAL])) {
    queryClient.setQueryData([UIStates.DELETE_REQUEST_MODAL], {
      shown: false,
      key: 'DELETE_REQUEST',
      data: [],
    });
  }

  const toggleModal = (isOpen: boolean, key: string, data: Set<string>) => {
    if (isOpen) {
      queryClient.setQueryData(['OVERLAY'], () => false);
    }
    queryClient.setQueryData([UIStates.DELETE_REQUEST_MODAL], () => ({
      shown: isOpen,
      key,
      data: data,
    }));
  };

  const { data: deleteModal } = useQuery({
    queryKey: [UIStates.DELETE_REQUEST_MODAL],
    queryFn: () =>
      queryClient.getQueryData([UIStates.DELETE_REQUEST_MODAL]) as {
        shown: boolean;
        key: keyof typeof deleteHash;
        data: Set<string>;
      },
  });

  const { mutate: deleteItem, isPending } = useMutation({
    mutationKey: ['DELETE_ITEM'],
    mutationFn: async () => {
      const item = queryClient.getQueryData([
        UIStates.DELETE_REQUEST_MODAL,
      ]) as {
        shown: boolean;
        key: keyof typeof deleteHash;
        data: Set<string>;
      };
      if (!Array.from(item?.data)?.length) {
        toggleNotification({
          type: 'error',
          show: true,
          title: 'Delete Error',
          message: 'Item to be deleted has not been selected',
        });
        throw new Error('Item to be deleted has not been selected');
      }
      return await deleteHash[item.key](item.data);
    },
    onSuccess: async () => {
      const formData = new FormData();
      const params = new URLSearchParams(searchParams.toString());
      const item = queryClient.getQueryData([
        UIStates.DELETE_REQUEST_MODAL,
      ]) as {
        shown: boolean;
        key: keyof typeof deleteHash;
        data: Set<string>;
      };

      toggleNotification({
        type: 'success',
        show: true,
        title: 'Delete Successfull',
        message: 'Item deeted successfully',
      });

      if (item.key === 'DELETE_REQUEST') return filterRequest(formData, params);
      if (item.key === 'DELETE_USERS') return filterCustomer(formData, params);
    },
    onError: (error) => {
      toggleNotification({
        type: 'error',
        show: true,
        title: 'Delete Error',
        message: error.message || 'An error occurred during deletion',
      });
    },
    onSettled: () => {
      toggleModal(false, 'DELETE_PRODUCT', new Set([]));
    },
  });
  return { toggleModal, deleteModal, deleteItem, isPending };
};

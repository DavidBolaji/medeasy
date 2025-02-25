'use client';

import React from 'react';
import { Empty, Grid } from 'antd';
import { useDashboardNotification } from '@/app/_hooks/use-dashboard-notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UIStates } from '@/config';
import { getUserNotifications, updateUserNotifications } from './action';
import { BellRing } from 'lucide-react';
import Typography from '../typography/typography';
import {
  StyledDashboardNotificationDrawer,
  StyledMobileDrawer,
} from './drawer.style';
const { useBreakpoint } = Grid;

const DashboardNotification = () => {
  const { open, close } = useDashboardNotification();
  const queryClient = useQueryClient();
  const screen = useBreakpoint();

  const { data: notifications, isPending } = useQuery({
    queryKey: [UIStates.USER_NOTIFICATION],
    queryFn: async () => await getUserNotifications(),
  });

  const { mutate } = useMutation({
    mutationKey: [UIStates.USER_NOTIFICATION],
    mutationFn: async (id: string) => await updateUserNotifications(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [UIStates.USER_NOTIFICATION],
      });
    },
  });

  const Tag = screen.lg
    ? StyledDashboardNotificationDrawer
    : StyledMobileDrawer;

  const placement = !screen.lg ? 'bottom' : 'right';
  const height = !screen.lg ? '90%' : '100%';

  return (
    <Tag
      open={open}
      placement={placement}
      height={height}
      onClose={close}
      footer={null}
      title={null}
      closeIcon={null}
    >
      <div className="flex sticky top-0 bg-white z-50 items-center gap-x-4 py-8 border-b px-6">
        <BellRing />
        <Typography className="font-bold text-xl">Notifications</Typography>
      </div>
      <div className="space-y-4">
        {isPending ? (
          <div className="animate-spin w-8 h-8 text-primary" />
        ) : null}
        {!isPending && notifications?.length ? (
          notifications.map((notification) => (
            <div
              onClick={() => mutate(notification.id)}
              key={notification.id}
              className="relative cursor-pointer px-6 py-6 border-b"
            >
              {!notification.read ? (
                <div className="absolute top-8">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              ) : null}
              <div className="ml-5">
                <Typography className="font-bold capitalize text-sm text-[#5C698A] mb-1">
                  {notification.title}
                </Typography>
                <Typography className="text-base font-medium text-[#141923]">
                  {notification.notification}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Tag>
  );
};

export default DashboardNotification;

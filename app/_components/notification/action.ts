'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';

export const getUserNotifications = async () => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getNotificationForUserController = getInjection(
      'IGetNotificationsForUserController'
    );
    return await getNotificationForUserController(sessionId);
  } catch (error) {
    throw error;
  }
};

export const updateUserNotifications = async (notificationId: string) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updateNotificationForUserController = getInjection(
      'IUpdateNotificationsForUserController'
    );
    return await updateNotificationForUserController(notificationId, sessionId);
  } catch (error) {
    throw error;
  }
};

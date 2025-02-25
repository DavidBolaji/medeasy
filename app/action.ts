'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import webpush from 'web-push';

// import webpush from 'web-push'
webpush.setVapidDetails(
  'https://medeasy.com',
  process.env.NEXT_PUBLIC_VAPID_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendNotification(message: string) {
  try {
    await webpush.sendNotification(
      JSON.parse('Hello'),
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    );
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}

export const handleNotification = async (subscription: PushSubscription) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const subscribeToPushNotificationController = getInjection(
      'ISubscribeToPushNotificationController'
    );
    const sub = await subscribeToPushNotificationController({
      subscription,
      sessionId,
    });
    return sub;
  } catch (error) {
    throw error;
  }
};

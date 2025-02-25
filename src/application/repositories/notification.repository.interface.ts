import { Notifications } from '@prisma/client';

export interface INotificationRepository {
  createNotification(
    userId: string,
    message: string,
    title: string
  ): Promise<void>;
  getNotificationsForUser(userId: string): Promise<Notifications[]>;
  updateNotificationForUser(
    notificationId: string,
    userId: string
  ): Promise<void>;
}

import db from '@/prisma';
import { INotificationRepository } from '@/src/application/repositories/notification.repository.interface';
import { Notifications } from '@prisma/client';

export class NotificationRepository implements INotificationRepository {
  async createNotification(
    userId: string,
    message: string,
    title: string
  ): Promise<void> {
    try {
      await db.notifications.create({
        data: {
          userId,
          notification: message,
          title,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getNotificationsForUser(userId: string): Promise<Notifications[]> {
    try {
      const notifications = await db.notifications.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  async updateNotificationForUser(
    notificationId: string,
    userId: string
  ): Promise<void> {
    try {
      await db.notifications.update({
        where: {
          userId,
          id: notificationId,
        },
        data: {
          read: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

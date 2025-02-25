import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetNotificationsForUserUseCase } from '@/src/application/use-cases/notification/get-notification-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { Notifications } from '@prisma/client';

export type IGetNotificationsForUserController = ReturnType<
  typeof getNotificationsFoUserController
>;

function presenter(notifications: Notifications[]) {
  const notificationList: Omit<
    Notifications,
    'updatedAt' | 'createdAt' | 'userId'
  >[] = [];

  notifications.forEach((notification) => {
    notificationList.push({
      id: notification.id,
      title: notification.title,
      notification: notification.notification,
      read: notification.read,
    });
  });

  return notificationList;
}

export const getNotificationsFoUserController =
  (
    getNotificationForUserUseCase: IGetNotificationsForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get Biders');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      const notifications = await getNotificationForUserUseCase(session.userId);
      return presenter(notifications);
    } catch (error) {
      throw error;
    }
  };

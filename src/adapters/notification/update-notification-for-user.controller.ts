import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateNotificationsForUserUseCase } from '@/src/application/use-cases/notification/update-notification-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';

export type IUpdateNotificationsForUserController = ReturnType<
  typeof updateNotificationsFoUserController
>;

export const updateNotificationsFoUserController =
  (
    updateNotificationForUserUseCase: IUpdateNotificationsForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (notificationId: string, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get Biders');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      await updateNotificationForUserUseCase(notificationId, session.userId);
    } catch (error) {
      throw error;
    }
  };

import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { ICreateNotificationUseCase } from '@/src/application/use-cases/notification/create-notification-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';

export type ICreateNotificationController = ReturnType<
  typeof createNotificationController
>;

export const createNotificationController =
  (
    createNotificationUseCase: ICreateNotificationUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    userId: string | undefined,
    message: string,
    title: string,
    sessionId: string | undefined
  ) => {
    try {
      if (!userId) {
        if (!sessionId) {
          throw new UnauthenticatedError(
            'Session ID is required when user ID is not provided'
          );
        }

        const { session } =
          await authenticationService.validateSession(sessionId);

        return await createNotificationUseCase(session.userId, message, title);
      }

      console.log('FORUSER');

      return await createNotificationUseCase(userId, message, title);
    } catch (error) {
      throw error;
    }
  };

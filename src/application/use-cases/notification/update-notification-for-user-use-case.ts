import { INotificationRepository } from '../../repositories/notification.repository.interface';

export type IUpdateNotificationsForUserUseCase = ReturnType<
  typeof updateNotificationsForUserUseCase
>;

export const updateNotificationsForUserUseCase =
  (notificationRepository: INotificationRepository) =>
  async (notificationId: string, userId: string) => {
    try {
      const notifications =
        await notificationRepository.updateNotificationForUser(
          notificationId,
          userId
        );
      return notifications;
    } catch (error) {
      throw error;
    }
  };

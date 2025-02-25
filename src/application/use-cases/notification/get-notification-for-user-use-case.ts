import { INotificationRepository } from '../../repositories/notification.repository.interface';

export type IGetNotificationsForUserUseCase = ReturnType<
  typeof getNotificationsForUserUseCase
>;

export const getNotificationsForUserUseCase =
  (notificationRepository: INotificationRepository) =>
  async (userId: string) => {
    try {
      const notifications =
        await notificationRepository.getNotificationsForUser(userId);
      return notifications;
    } catch (error) {
      throw error;
    }
  };

import { INotificationRepository } from '../../repositories/notification.repository.interface';

export type ICreateNotificationUseCase = ReturnType<
  typeof createNotificationUseCase
>;

export const createNotificationUseCase =
  (notificationRepository: INotificationRepository) =>
  async (userId: string, message: string, title: string) => {
    try {
      await notificationRepository.createNotification(userId, message, title);
    } catch (error) {
      throw error;
    }
  };

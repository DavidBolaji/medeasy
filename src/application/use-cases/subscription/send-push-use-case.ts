import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { ISubscriptionRepository } from '../../repositories/subscription.repository.interface';
import { ISubscriptionService } from '../../services/subscription.service.interface';

export type ISendPushUseCase = ReturnType<typeof sendPushUseCase>;

export const sendPushUseCase =
  (
    subscriptionRepository: ISubscriptionRepository,
    subscriptionService: ISubscriptionService
  ) =>
  async (userId: string, message: string, name: string) => {
    try {
      const subscription =
        await subscriptionRepository.getSubscriptionById(userId);

      await subscriptionService.sendPushNotification(
        subscription,
        message,
        name
      );
    } catch (error) {
      throw error;
    }
  };

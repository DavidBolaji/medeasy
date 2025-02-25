import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { SubscriptionRepository } from '@/src/infrastructure/repositories/subscription.repository';
import { subscribeToPushNotificationUseCase } from '@/src/application/use-cases/subscription/subscribe-to-push-notification-use-case';
import { subscribeToPushNotificationController } from '@/src/adapters/subscription/subscribe-to-push-notification.controller';
import { sendPushController } from '@/src/adapters/subscription/send-push.controller';
import { sendPushUseCase } from '@/src/application/use-cases/subscription/send-push-use-case';
import { SubscriptionService } from '@/src/infrastructure/services/subscription.service';

export function createSubscriptionModule() {
  const subscriptionModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // subscriptionModule.bind(DI_SYMBOLS.IUserRepository).toClass(MocksubscriptionRepository);
  } else {
    subscriptionModule
      .bind(DI_SYMBOLS.ISubscriptionRepository)
      .toClass(SubscriptionRepository);
    subscriptionModule
      .bind(DI_SYMBOLS.ISubscriptionService)
      .toClass(SubscriptionService);
  }
  // use case
  subscriptionModule
    .bind(DI_SYMBOLS.ISubscribeToPushNotificationUseCase)
    .toHigherOrderFunction(subscribeToPushNotificationUseCase, [
      DI_SYMBOLS.ISubscriptionRepository,
    ]);

  subscriptionModule
    .bind(DI_SYMBOLS.ISendPushUseCase)
    .toHigherOrderFunction(sendPushUseCase, [
      DI_SYMBOLS.ISubscriptionRepository,
      DI_SYMBOLS.ISubscriptionService,
    ]);

  // controller
  subscriptionModule
    .bind(DI_SYMBOLS.ISubscribeToPushNotificationController)
    .toHigherOrderFunction(subscribeToPushNotificationController, [
      DI_SYMBOLS.ISubscribeToPushNotificationUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  subscriptionModule
    .bind(DI_SYMBOLS.ISendPushController)
    .toHigherOrderFunction(sendPushController, [
      DI_SYMBOLS.ISendPushUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return subscriptionModule;
}

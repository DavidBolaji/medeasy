import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { NotificationRepository } from '@/src/infrastructure/repositories/notification.repository';
import { createNotificationController } from '@/src/adapters/notification/create-notification.controller';
import { createNotificationUseCase } from '@/src/application/use-cases/notification/create-notification-use-case';
import { getNotificationsForUserUseCase } from '@/src/application/use-cases/notification/get-notification-for-user-use-case';
import { getNotificationsFoUserController } from '@/src/adapters/notification/get-notification-for-user.controller';
import { updateNotificationsForUserUseCase } from '@/src/application/use-cases/notification/update-notification-for-user-use-case';
import { updateNotificationsFoUserController } from '@/src/adapters/notification/update-notification-for-user.controller';

export function createNotificationModule() {
  const notificationModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // notificationModule.bind(DI_SYMBOLS.IUserRepository).toClass(MocknotificationRepository);
  } else {
    notificationModule
      .bind(DI_SYMBOLS.INotificationRepository)
      .toClass(NotificationRepository);
  }

  notificationModule
    .bind(DI_SYMBOLS.ICreateNotificationUseCase)
    .toHigherOrderFunction(createNotificationUseCase, [
      DI_SYMBOLS.INotificationRepository,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IGetNotificationsForUserUseCase)
    .toHigherOrderFunction(getNotificationsForUserUseCase, [
      DI_SYMBOLS.INotificationRepository,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IUpdateNotificationsForUserUseCase)
    .toHigherOrderFunction(updateNotificationsForUserUseCase, [
      DI_SYMBOLS.INotificationRepository,
    ]);

  // controller
  notificationModule
    .bind(DI_SYMBOLS.ICreateNotificationController)
    .toHigherOrderFunction(createNotificationController, [
      DI_SYMBOLS.ICreateNotificationUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IGetNotificationsForUserController)
    .toHigherOrderFunction(getNotificationsFoUserController, [
      DI_SYMBOLS.IGetNotificationsForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IUpdateNotificationsForUserController)
    .toHigherOrderFunction(updateNotificationsFoUserController, [
      DI_SYMBOLS.IUpdateNotificationsForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return notificationModule;
}

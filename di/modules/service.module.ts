import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { ServiceRepository } from '@/src/infrastructure/repositories/service.repository';
import { getServiceForUserController } from '@/src/adapters/services/get-service-for-user.controller';
import { getServiceForUserUseCase } from '@/src/application/use-cases/service/get-service-for-user-use-case';
import { updateServiceForUserController } from '@/src/adapters/services/update-service-for-user.controller';
import { updateServiceForUserUseCase } from '@/src/application/use-cases/service/update-service-for-user-use-case';

export function createServiceModule() {
  const serviceModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // certificationModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockcertificationRepository);
  } else {
    serviceModule
      .bind(DI_SYMBOLS.IServiceRepository)
      .toClass(ServiceRepository);
  }

  serviceModule
    .bind(DI_SYMBOLS.IGetServiceForUserUseCase)
    .toHigherOrderFunction(getServiceForUserUseCase, [
      DI_SYMBOLS.IServiceRepository,
    ]);

  serviceModule
    .bind(DI_SYMBOLS.IUpdateServiceForUserUseCase)
    .toHigherOrderFunction(updateServiceForUserUseCase, [
      DI_SYMBOLS.IServiceRepository,
    ]);

  serviceModule
    .bind(DI_SYMBOLS.IUpdateServiceForUserController)
    .toHigherOrderFunction(updateServiceForUserController, [
      DI_SYMBOLS.IUpdateServiceForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  serviceModule
    .bind(DI_SYMBOLS.IGetServiceForUserController)
    .toHigherOrderFunction(getServiceForUserController, [
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IGetServiceForUserUseCase,
    ]);

  return serviceModule;
}

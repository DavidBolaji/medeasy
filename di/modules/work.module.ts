import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { getWorkForUserController } from '@/src/adapters/work/get-work-for-user.controller';
import { getWorkForUserUseCase } from '@/src/application/use-cases/work/get-work-for-user-use-case';
import { updateWorkForUserUseCase } from '@/src/application/use-cases/work/update-work-for-user-use-case';
import { updateWorkForUserController } from '@/src/adapters/work/update-work-for-user.controller';
import { getWorkWithIdUseCase } from '@/src/application/use-cases/work/get-work-with-id-use-case';
import { getWorkWithIdController } from '@/src/adapters/work/get-work-with-id.controller';

export function createWorkModule() {
  const workModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // certificationModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockcertificationRepository);
  } else {
    workModule
      .bind(DI_SYMBOLS.IGetWorkForUserController)
      .toHigherOrderFunction(getWorkForUserController, [
        DI_SYMBOLS.IGetWorkForUserUseCase,
        DI_SYMBOLS.IAuthenticationService,
      ]);
  }

  workModule
    .bind(DI_SYMBOLS.IUpdateWorkForUserController)
    .toHigherOrderFunction(updateWorkForUserController, [
      DI_SYMBOLS.IUpdateWorkForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  workModule
    .bind(DI_SYMBOLS.IGetWorkWithIdController)
    .toHigherOrderFunction(getWorkWithIdController, [
      DI_SYMBOLS.IGetWorkWithIdUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  workModule
    .bind(DI_SYMBOLS.IGetWorkForUserUseCase)
    .toHigherOrderFunction(getWorkForUserUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.ICertificationRepository,
    ]);

  workModule
    .bind(DI_SYMBOLS.IGetWorkWithIdUseCase)
    .toHigherOrderFunction(getWorkWithIdUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.ICertificationRepository,
    ]);

  workModule
    .bind(DI_SYMBOLS.IUpdateWorkForUserUseCase)
    .toHigherOrderFunction(updateWorkForUserUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.ICertificationRepository,
    ]);

  return workModule;
}

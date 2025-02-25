import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { UsersRepository } from '@/src/infrastructure/repositories/user.repository';
import { getDetailForUserController } from '@/src/adapters/users/get-details-for-user.controller';
import { getDetailForUserUseCase } from '@/src/application/use-cases/user/get-detail-for-user-use-case';
import { updateDetailsForUserUseCase } from '@/src/application/use-cases/user/update-detail-for-user-use-case';
import { updateDetailForUserController } from '@/src/adapters/users/update-detail-for-user.controller';
import { getUserRoleController } from '@/src/adapters/users/get-user-role.controller';

export function createUsersModule() {
  const usersModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // usersModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockUsersRepository);
  } else {
    usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository);
  }
  usersModule
    .bind(DI_SYMBOLS.IGetDetailsForUserUseCase)
    .toHigherOrderFunction(getDetailForUserUseCase, [
      DI_SYMBOLS.IUsersRepository,
    ]);

  usersModule
    .bind(DI_SYMBOLS.IUpdateDetailsForUserUseCase)
    .toHigherOrderFunction(updateDetailsForUserUseCase, [
      DI_SYMBOLS.IUsersRepository,
    ]);

  usersModule
    .bind(DI_SYMBOLS.IUpdateDetailsForUserController)
    .toHigherOrderFunction(updateDetailForUserController, [
      DI_SYMBOLS.IUpdateDetailsForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  usersModule
    .bind(DI_SYMBOLS.IGetDetailsForUserController)
    .toHigherOrderFunction(getDetailForUserController, [
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IGetDetailsForUserUseCase,
    ]);

  usersModule
    .bind(DI_SYMBOLS.IGetUserRoleController)
    .toHigherOrderFunction(getUserRoleController, [
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return usersModule;
}

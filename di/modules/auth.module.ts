import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@/di/types';
import {
  signUpAccountOwnerUseCase,
  signUpUseCase,
} from '@/src/application/use-cases/sign-up-use-case';
import {
  signUpAccountOwnerController,
  signUpController,
} from '@/src/adapters/auth/sign-up.controller';
import { AuthenticationService } from '@/src/infrastructure/services/auth.service';
import { signInController } from '@/src/adapters/auth/sign-in.controller';
import { signInUseCase } from '@/src/application/use-cases/sign-in-use-case';
import { signOutController } from '@/src/adapters/auth/sign-out.controller';
import { signOutUseCase } from '@/src/application/use-cases/sign-out.use-case';
import { signInAdminUseCase } from '@/src/application/use-cases/sign-in-admin-use-case';
import { signInAdminController } from '@/src/adapters/auth/sign-in-admin.controller';

export function createAuthenticationModule() {
  const authenticationModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // authenticationModule
    //   .bind(DI_SYMBOLS.IAuthenticationService)
    //   .toClass(MockAuthenticationService, [DI_SYMBOLS.IUsersRepository]);
  } else {
    authenticationModule
      .bind(DI_SYMBOLS.IAuthenticationService)
      .toClass(AuthenticationService, [DI_SYMBOLS.IUsersRepository]);
  }
  // use case
  authenticationModule
    .bind(DI_SYMBOLS.ISignUpUseCase)
    .toHigherOrderFunction(signUpUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.ICertificationRepository,
      DI_SYMBOLS.IPaymentRepository,
      DI_SYMBOLS.IVerificationRepository,
      DI_SYMBOLS.IServiceRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpAccountOwnerUseCase)
    .toHigherOrderFunction(signUpAccountOwnerUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IAddressRepository,
      DI_SYMBOLS.IVerificationRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInUseCase)
    .toHigherOrderFunction(signInUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutUseCase)
    .toHigherOrderFunction(signOutUseCase, [DI_SYMBOLS.IAuthenticationService]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInAdminUseCase)
    .toHigherOrderFunction(signInAdminUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IAuthenticationService
    ]);

  // conroller
  authenticationModule
    .bind(DI_SYMBOLS.ISignUpController)
    .toHigherOrderFunction(signUpController, [
      DI_SYMBOLS.ISignUpUseCase,
      DI_SYMBOLS.ITransactionService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpAccountOwnerController)
    .toHigherOrderFunction(signUpAccountOwnerController, [
      DI_SYMBOLS.ISignUpAccountOwnerUseCase,
      DI_SYMBOLS.ITransactionService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInController)
    .toHigherOrderFunction(signInController, [DI_SYMBOLS.ISignInUseCase]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutController)
    .toHigherOrderFunction(signOutController, [
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ISignOutUseCase,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInAdminController)
    .toHigherOrderFunction(signInAdminController, [
      DI_SYMBOLS.ISignInAdminUseCase,
    ]);

  return authenticationModule;
}

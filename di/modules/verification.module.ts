import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { VerificationRepository } from '@/src/infrastructure/repositories/verification.repository';
import { verificationUseCase } from '@/src/application/use-cases/verification/verification-use-case';
import { verificationController } from '@/src/adapters/verification/verification.controller';
import { VerificationService } from '@/src/infrastructure/services/verification.service';
import { getVerificationForUserController } from '@/src/adapters/verification/get-verification.controller';
import { getVerificationForUserUseCase } from '@/src/application/use-cases/verification/get-verification-use-case';
import { updateVerificationForUserController } from '@/src/adapters/verification/update-verification-for-user.controller';
import { updateVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-verification-for-user-use-case';
import { updateIDVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-id-verification-for-user-use-case';
import { updateIDVerificationForUserController } from '@/src/adapters/verification/update-id-verification-for-user.controller';
import { getVerificationWithIdUseCase } from '@/src/application/use-cases/verification/get-verification-with-id-use-case';
import { getVerificationWithIdController } from '@/src/adapters/verification/get-verification-with-id.controller';

export function createVerificationModule() {
  const verificationModule = createModule();

  // Bind services and repositories based on the environment
  if (process.env.NODE_ENV === 'test') {
    // Bind mock implementations for testing if needed
    // verificationModule.bind(DI_SYMBOLS.IVerificationRepository).toClass(MockVerificationRepository);
    // verificationModule.bind(DI_SYMBOLS.IVerificationService).toClass(MockVerificationService);
  } else {
    verificationModule
      .bind(DI_SYMBOLS.IVerificationService)
      .toClass(VerificationService);
    verificationModule
      .bind(DI_SYMBOLS.IVerificationRepository)
      .toClass(VerificationRepository);
  }

  // Bind use cases
  verificationModule
    .bind(DI_SYMBOLS.IVerificationUseCase)
    .toHigherOrderFunction(verificationUseCase, [
      DI_SYMBOLS.IVerificationService,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IGetVerificationForUserUseCase)
    .toHigherOrderFunction(getVerificationForUserUseCase, [
      DI_SYMBOLS.IVerificationRepository,
      DI_SYMBOLS.IVerificationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IGetVerificationWithIdUseCase)
    .toHigherOrderFunction(getVerificationWithIdUseCase, [
      DI_SYMBOLS.IVerificationRepository,
      DI_SYMBOLS.IVerificationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IUpdateVerificationForUserUseCase)
    .toHigherOrderFunction(updateVerificationForUserUseCase, [
      DI_SYMBOLS.IVerificationRepository,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IUpdateIDVerificationForUserUseCase)
    .toHigherOrderFunction(updateIDVerificationForUserUseCase, [
      DI_SYMBOLS.IVerificationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  // Bind controllers
  verificationModule
    .bind(DI_SYMBOLS.IVerificationController)
    .toHigherOrderFunction(verificationController, [
      DI_SYMBOLS.IVerificationUseCase,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IGetVerificationForUserController)
    .toHigherOrderFunction(getVerificationForUserController, [
      DI_SYMBOLS.IGetVerificationForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IGetVerificationWithIdController)
    .toHigherOrderFunction(getVerificationWithIdController, [
      DI_SYMBOLS.IGetVerificationWithIdUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IUpdateVerificationForUserController)
    .toHigherOrderFunction(updateVerificationForUserController, [
      DI_SYMBOLS.IUpdateVerificationForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  verificationModule
    .bind(DI_SYMBOLS.IUpdateIDVerificationForUserController)
    .toHigherOrderFunction(updateIDVerificationForUserController, [
      DI_SYMBOLS.IUpdateIDVerificationForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return verificationModule;
}

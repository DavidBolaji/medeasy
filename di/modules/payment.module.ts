import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { PaymentRepository } from '@/src/infrastructure/repositories/payment.repository';
import { getBanksForPaymentController } from '@/src/adapters/payment/get-banks-for-payment.controller';
import { getBanksForPaymentUseCase } from '@/src/application/use-cases/payment/get-banks-for-payment-use-case';
import { PaymentService } from '@/src/infrastructure/services/payment.service';
import { getPaymentsForUserController } from '@/src/adapters/payment/get-payment-for-user.controller';
import { updatePaymentForUserController } from '@/src/adapters/payment/update-payment-for-user.controller';
import { updatePaymentForUserUseCase } from '@/src/application/use-cases/payment/update-payment-for-user-use-case';
import { updatepdatePaymentValidationForUserUseCase } from '@/src/application/use-cases/payment/update-payment-validation-use-case';
import { updatePaymentValidationForUserController } from '@/src/adapters/payment/update-payment-validation.controller';
import { getPaymentsForUserUseCase } from '@/src/application/use-cases/payment/get-payment-for-user-use-case';
import { getPaymentsWithIdController } from '@/src/adapters/payment/get-payment-with-id.controller';
import { getPaymentsWithIdUseCase } from '@/src/application/use-cases/payment/get-payment-with-id-use-case';

export function createPaymentModule() {
  const paymentModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // paymentModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockpaymentRepository);
  } else {
    paymentModule
      .bind(DI_SYMBOLS.IPaymentRepository)
      .toClass(PaymentRepository);
    paymentModule.bind(DI_SYMBOLS.IPaymentService).toClass(PaymentService);
  }
  // use case
  paymentModule
    .bind(DI_SYMBOLS.IGetBanksForPaymentUseCase)
    .toHigherOrderFunction(getBanksForPaymentUseCase, [
      DI_SYMBOLS.IPaymentService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IGetPaymentsForUserUseCase)
    .toHigherOrderFunction(getPaymentsForUserUseCase, [
      DI_SYMBOLS.IPaymentRepository,
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IVerificationService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IGetPaymentsWithIdUseCase)
    .toHigherOrderFunction(getPaymentsWithIdUseCase, [
      DI_SYMBOLS.IPaymentRepository,
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IVerificationService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IUpdatePaymentForUserUseCase)
    .toHigherOrderFunction(updatePaymentForUserUseCase, [
      DI_SYMBOLS.IPaymentRepository,
      DI_SYMBOLS.IVerificationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IUpdatePaymentValidationForUserUseCase)
    .toHigherOrderFunction(updatepdatePaymentValidationForUserUseCase, [
      DI_SYMBOLS.IVerificationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  // controller
  paymentModule
    .bind(DI_SYMBOLS.IGetBanksForPaymentController)
    .toHigherOrderFunction(getBanksForPaymentController, [
      DI_SYMBOLS.IGetBanksForPaymentUseCase,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IGetPaymentsForUserController)
    .toHigherOrderFunction(getPaymentsForUserController, [
      DI_SYMBOLS.IGetPaymentsForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IGetPaymentsWithIdController)
    .toHigherOrderFunction(getPaymentsWithIdController, [
      DI_SYMBOLS.IGetPaymentsWithIdUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IUpdatePaymentForUserController)
    .toHigherOrderFunction(updatePaymentForUserController, [
      DI_SYMBOLS.IUpdatePaymentForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  paymentModule
    .bind(DI_SYMBOLS.IUpdatePaymentValidationForUserController)
    .toHigherOrderFunction(updatePaymentValidationForUserController, [
      DI_SYMBOLS.IUpdatePaymentValidationForUserUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return paymentModule;
}

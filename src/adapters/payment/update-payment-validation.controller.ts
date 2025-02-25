import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdatePaymentValidationForUserUseCase } from '@/src/application/use-cases/payment/update-payment-validation-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { signUpFiveSchema } from '@/src/entities/models/auth/sign-up-schema';
import { IVerifyUser } from '@/src/entities/models/verification';

export type IUpdatePaymentValidationForUserController = ReturnType<
  typeof updatePaymentValidationForUserController
>;

export const updatePaymentValidationForUserController =
  (
    updatePaymentForUserUseCase: IUpdatePaymentValidationForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    payments: Pick<IVerifyUser, 'actNo' | 'bank'>,
    sessionId: string | undefined
  ) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update payments');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: payment, error: inputParseError } = signUpFiveSchema
        .pick({ bank: true, actNo: true })
        .safeParse(payments);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      return await updatePaymentForUserUseCase(payment, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

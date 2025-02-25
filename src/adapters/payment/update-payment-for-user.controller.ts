import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdatePaymentForUserUseCase } from '@/src/application/use-cases/payment/update-payment-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  signUpFiveSchema,
  SignUpFiveSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

export type IUpdatePaymentForUserController = ReturnType<
  typeof updatePaymentForUserController
>;
export const updatePaymentForUserController =
  (
    updatePaymentForUserUseCase: IUpdatePaymentForUserUseCase,
    authenticationPayment: IAuthenticationService
  ) =>
  async (payments: SignUpFiveSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update payments');
      }
      const { session } =
        await authenticationPayment.validateSession(sessionId);

      const { data: payment, error: inputParseError } =
        signUpFiveSchema.safeParse(payments);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updatePaymentForUserUseCase(payment, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

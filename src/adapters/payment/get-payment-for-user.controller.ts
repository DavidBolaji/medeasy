import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetPaymentsForUserUseCase } from '@/src/application/use-cases/payment/get-payment-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Payment as PPayment, ROLE } from '@prisma/client';

export type IGetPaymentsForUserController = ReturnType<
  typeof getPaymentsForUserController
>;

function presenter(
  payments: PPayment,
  verification: string,
  role: ROLE
): SignUpFiveSchemaType {
  return {
    actNo: payments.actNo,
    bank: payments.bank,
    actVerified: Boolean(verification?.length),
    verifiedName: verification,
    role,
  };
}

export const getPaymentsForUserController =
  (
    getPaymentsForUserUseCase: IGetPaymentsForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get payment');
      }
      const { session, role } =
        await authenticationService.validateSession(sessionId);

      const { payments, verification } = await getPaymentsForUserUseCase(
        session.userId
      );
      return presenter(payments, verification, role as ROLE);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

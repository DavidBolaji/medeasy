import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetPaymentsWithIdUseCase } from '@/src/application/use-cases/payment/get-payment-with-id-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Payment as PPayment, ROLE } from '@prisma/client';

export type IGetPaymentsWithIdController = ReturnType<
  typeof getPaymentsWithIdController
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

export const getPaymentsWithIdController =
  (
    getPaymentsWithIdUseCase: IGetPaymentsWithIdUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    id: string,
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get payment');
      }
      const { userType, role } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      const { payments, verification } = await getPaymentsWithIdUseCase(id);
      return presenter(payments, verification, role as ROLE);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

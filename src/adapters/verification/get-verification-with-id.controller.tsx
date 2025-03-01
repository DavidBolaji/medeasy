import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetVerificationWithIdUseCase } from '@/src/application/use-cases/verification/get-verification-with-id-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Verification } from '@prisma/client';

export type IGetVerificationWithIdController = ReturnType<
  typeof getVerificationWithIdController
>;

function presenter(verification: Verification): SignUpFourSchemaType {
  return {
    type: verification.type,
    doc: verification.doc,
    expiry: verification.expiry.toISOString(),
    no: verification.id,
  };
}

export const getVerificationWithIdController =
  (
    getVerificationWithIdUseCase: IGetVerificationWithIdUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    id: string,
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }

      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      const { verification } = await getVerificationWithIdUseCase(id);
      return presenter(verification);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

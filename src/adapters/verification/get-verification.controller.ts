import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetVerificationForUserUseCase } from '@/src/application/use-cases/verification/get-verification-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Verification } from '@prisma/client';

export type IGetVerificationForUserController = ReturnType<
  typeof getVerificationForUserController
>;

function presenter(
  verification: Verification,
): SignUpFourSchemaType {
  return {
    type: verification.type,
    doc: verification.doc,
    expiry: verification.expiry.toISOString(),
    no: verification.id,
  };
}

export const getVerificationForUserController =
  (
    getVerificationForUserUseCase: IGetVerificationForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);
      const { verification } = await getVerificationForUserUseCase(
        session.userId
      );
      return presenter(verification);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-verification-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  signUpFourSchema,
  SignUpFourSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateVerificationForUserController = ReturnType<
  typeof updateVerificationForUserController
>;

export const updateVerificationForUserController =
  (
    updateVerificationForUserUseCase: IUpdateVerificationForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    user: SignUpFourSchemaType,
    sessionId: string | undefined
  ): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError(
          'Must be logged in to update verification'
        );
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data, error: inputParseError } = signUpFourSchema.safeParse(user);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updateVerificationForUserUseCase(data, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

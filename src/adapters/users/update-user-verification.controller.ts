import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateDetailsForUserUseCase } from '@/src/application/use-cases/user/update-detail-for-user-use-case';
import { IUpdateUserVerificationUseCase } from '@/src/application/use-cases/user/update-user-verification-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  signUpTwoSchema,
  SignUpTwoSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { UpdateUserVerification } from '@/src/entities/models/user';

export type IUpdateUserVerificationController = ReturnType<
  typeof updateUserVerificationController
>;

export const updateUserVerificationController =
  (
    updateUserVerificationUseCase: IUpdateUserVerificationUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: UpdateUserVerification,
    sessionId: string | undefined
  ): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update details');
      }

      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      await updateUserVerificationUseCase(input);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

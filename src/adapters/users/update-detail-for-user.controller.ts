import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateDetailsForUserUseCase } from '@/src/application/use-cases/user/update-detail-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  signUpTwoSchema,
  SignUpTwoSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateDetailsForUserController = ReturnType<
  typeof updateDetailForUserController
>;

export const updateDetailForUserController =
  (
    updateDetailForUserUseCase: IUpdateDetailsForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    user: SignUpTwoSchemaType,
    sessionId: string | undefined
  ): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update details');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data, error: inputParseError } = signUpTwoSchema.safeParse(user);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updateDetailForUserUseCase(data, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

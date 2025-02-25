import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateIDVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-id-verification-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';

import {
  IVerifyUser,
  verifyUserSchema,
} from '@/src/entities/models/verification';

export type IUpdateIDVerificationForUserController = ReturnType<
  typeof updateIDVerificationForUserController
>;

export const updateIDVerificationForUserController =
  (
    updateIDVerificationForUserUseCase: IUpdateIDVerificationForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: Omit<IVerifyUser, 'user'>,
    sessionId: string | undefined
  ): Promise<boolean> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data, error: inputParseError } = verifyUserSchema
        .omit({ user: true, actNo: true, bank: true })
        .safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      const { verified } = await updateIDVerificationForUserUseCase(
        data,
        session.userId
      );
      return verified;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

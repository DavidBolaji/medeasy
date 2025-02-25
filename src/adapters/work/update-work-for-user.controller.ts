import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateWorkForUserUseCase } from '@/src/application/use-cases/work/update-work-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  workSchema,
  WorkSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateWorkForUserController = ReturnType<
  typeof updateWorkForUserController
>;

export const updateWorkForUserController =
  (
    updateWorkForUserUseCase: IUpdateWorkForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (work: WorkSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update services');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data, error: inputParseError } = workSchema.safeParse(work);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updateWorkForUserUseCase(data, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

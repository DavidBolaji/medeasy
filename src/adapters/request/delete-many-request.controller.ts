import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IDeleteManyRequestUseCase } from '@/src/application/use-cases/request/delete-many-request-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';

export type IDeleteManyRequestController = ReturnType<
  typeof deleteManyRequestController
>;

export const deleteManyRequestController =
  (
    deleteManyRequestUseCase: IDeleteManyRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (data: Set<string>, sessionId: string | undefined): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update details');
      }
      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      await deleteManyRequestUseCase(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

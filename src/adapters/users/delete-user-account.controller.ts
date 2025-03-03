import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IDeleteUserAccountUseCase } from '@/src/application/use-cases/user/delete-user-account-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';

export type IDeleteUserAccountController = ReturnType<
  typeof deleteUserAccountController
>;

export const deleteUserAccountController =
  (
    deleteUserAccountUseCase: IDeleteUserAccountUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (id: string, sessionId: string | undefined): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update details');
      }
      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      await deleteUserAccountUseCase(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

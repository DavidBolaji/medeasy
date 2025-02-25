import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { ROLE } from '@prisma/client';

export type IGetUserRoleController = ReturnType<typeof getUserRoleController>;

export const getUserRoleController =
  (authenticationService: IAuthenticationService) =>
  async (sessionId: string | undefined): Promise<ROLE | undefined> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }
      const { role } = await authenticationService.validateSession(sessionId);

      return role;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

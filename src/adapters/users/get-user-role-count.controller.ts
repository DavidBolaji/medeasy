import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetUserRoleCountUseCase } from '@/src/application/use-cases/user/get-user-role-count-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  GetUserRoleCountType,
  ReturnGetUserRoleCountType,
} from '@/src/entities/models/user';

export type IGetUserRoleCountController = ReturnType<
  typeof getUserRoleCountController
>;

function presenter(
  userRole: GetUserRoleCountType
): ReturnGetUserRoleCountType[] {
  const roles = Object.keys(userRole);

  const userRoleCount: ReturnGetUserRoleCountType[] = [];

  roles.forEach((role) => {
    userRoleCount.push({
      text:
        role === 'HelpProvider'
          ? 'Total no of help providers'
          : 'Total no of account owners',
      value: userRole[role].toString(),
    });
  });
  return userRoleCount;
}

export const getUserRoleCountController =
  (
    authenticationService: IAuthenticationService,
    getUserRoleCountUseCase: IGetUserRoleCountUseCase
  ) =>
  async (
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

      const result = await getUserRoleCountUseCase();
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

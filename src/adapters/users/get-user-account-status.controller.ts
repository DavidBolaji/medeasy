import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetUserAccountStatusUseCase } from '@/src/application/use-cases/user/get-user-account-status-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  GetUserAccountStatusType,
  ReturnGetUserAccountStatusType,
} from '@/src/entities/models/user';
import { CheckCircle, PlusCircle, Trash } from 'lucide-react';

export type IGetUserAccountStatusController = ReturnType<
  typeof getUserAccountStatusController
>;

function presenter(
  userStatus: GetUserAccountStatusType
): ReturnGetUserAccountStatusType[] {
  const status = Object.keys(userStatus);

  const userAccountStatus: ReturnGetUserAccountStatusType[] = [];

  status.forEach((stat) => {
    userAccountStatus.push({
      title:
        stat === 'total'
          ? 'New Registrations'
          : stat === 'verified'
            ? 'Verified registrations'
            : 'Deleted accounts',
      value: userStatus[stat].toString(),
      icon:
        stat === 'total'
          ? PlusCircle
          : stat === 'verified'
            ? CheckCircle
            : Trash,
    });
  });
  return userAccountStatus;
}

export const getUserAccountStatusController =
  (
    authenticationService: IAuthenticationService,
    getUserAccountStatusUseCase: IGetUserAccountStatusUseCase
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

      const result = await getUserAccountStatusUseCase();
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

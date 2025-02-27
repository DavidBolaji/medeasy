import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetRequestStatusUseCase } from '@/src/application/use-cases/request/get-request-stat-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  GetRequestStatType,
  ReturnGetRequestStatType,
} from '@/src/entities/models/requests';
import { CheckCircle, Clock, Loader } from 'lucide-react';

export type IGetRequestStatController = ReturnType<
  typeof getRequestStatController
>;

function presenter(userStatus: GetRequestStatType): ReturnGetRequestStatType[] {
  const status = Object.keys(userStatus);

  const RequestStat: ReturnGetRequestStatType[] = [];

  status
    .filter((el) => el !== 'CANCELLED')
    .forEach((stat) => {
      RequestStat.push({
        title:
          stat === 'NEW'
            ? 'Pending requests'
            : stat === 'ONGOING'
              ? 'In-progress requests'
              : 'Completed requests',
        value: userStatus[stat].toString(),
        icon:
          stat === 'NEW' ? Loader : stat === 'verified' ? Clock : CheckCircle,
      });
    });
  return RequestStat;
}

export const getRequestStatController =
  (
    getRequestStatUseCase: IGetRequestStatusUseCase,
    authenticationService: IAuthenticationService
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

      const result = await getRequestStatUseCase();
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetMonthlyCompletedUseCase } from '@/src/application/use-cases/request/get-monthly-completed-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { format } from 'date-fns';

export type IGetMonthlyCompletedController = ReturnType<
  typeof getMonthlyCompletedController
>;

function presenter(
  requestCompleted: any
): { month: string; completed: number }[] {
  // Initialize an array with months and zero completed
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: format(new Date(new Date().getFullYear(), i, 1), 'MMM'), // Adjust year dynamically if needed
    completed: 0,
  }));

  // Map request to the corresponding month
  requestCompleted.forEach(({ createdAt, _count }: any) => {
    const monthIndex = new Date(createdAt).getMonth();
    if (_count?.id) {
      months[monthIndex].completed += 1;
    }
  });

  return months;
}

export const getMonthlyCompletedController =
  (
    getMonthlyCompletedUseCase: IGetMonthlyCompletedUseCase,
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

      const result = await getMonthlyCompletedUseCase();
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

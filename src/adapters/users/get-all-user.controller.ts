import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetAllUserUseCase } from '@/src/application/use-cases/user/get-all-user-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  GetAllUserParams,
  GetAllUsersType,
  ReturnGetAllUsersType,
} from '@/src/entities/models/user';
import { format } from 'date-fns';

export type IGetAllUserController = ReturnType<typeof getAllUserController>;

function presenter(result: GetAllUsersType): ReturnGetAllUsersType {
  const AllUser: any = [];

  result.users.forEach((user) => {
    AllUser.push({
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
      verified: user.verified,
      createdAt: format(user.createdAt, 'PPP'),
    });
  });
  return { users: AllUser, totalPages: result.totalPages };
}

export const getAllUserController =
  (
    getAllUserUseCase: IGetAllUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: GetAllUserParams,
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

      const result = await getAllUserUseCase(input);
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

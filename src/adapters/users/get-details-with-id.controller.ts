import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetDetailsWithIdUseCase } from '@/src/application/use-cases/user/get-details-with-id-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { User } from '@prisma/client';

export type IGetDetailsWithIdController = ReturnType<
  typeof getDetailWithIdController
>;

function presenter(user: User): SignUpTwoSchemaType {
  return {
    fname: user.fname,
    lname: user.lname,
    language: user.language,
    gender: user.gender,
    dob: user.dob.toISOString(),
  };
}

export const getDetailWithIdController =
  (
    authenticationService: IAuthenticationService,
    getDetailWithIdUseCase: IGetDetailsWithIdUseCase
  ) =>
  async (
    id: string,
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

      const details = await getDetailWithIdUseCase(id);
      return presenter(details);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetDetailForUserUseCase } from '@/src/application/use-cases/user/get-detail-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { User } from '@prisma/client';

export type IGetDetailsForUserController = ReturnType<
  typeof getDetailForUserController
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

export const getDetailForUserController =
  (
    authenticationService: IAuthenticationService,
    getDetailForUserUseCase: IGetDetailForUserUseCase
  ) =>
  async (
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const details = await getDetailForUserUseCase(session.userId);
      return presenter(details);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

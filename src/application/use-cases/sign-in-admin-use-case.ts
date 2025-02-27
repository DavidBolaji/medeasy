import { Cookie } from '@/src/entities/models/cookie';
import { Session } from '@/src/entities/models/session';
import { IUsersRepository } from '../repositories/user.repository.interface';
import { IAuthenticationService } from '../services/auth.service.interface';

import { AuthenticationError } from '@/src/entities/error/auth';
import { signInSchemaType } from '@/src/entities/models/auth/login-schema';

export type IsignInAdminUseCase = ReturnType<typeof signInAdminUseCase>;

export const signInAdminUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: signInSchemaType,
  ): Promise<{ session: Session; cookie: Cookie }> => {
    try {
      const existingUser = await usersRepository.getUserByEmail(input.email);

      if (!existingUser) {
        throw new AuthenticationError('User does not exist');
      }

      const validPassword = await authenticationService.validatePasswords(
        input.password,
        existingUser.password
      );

      if (!validPassword) {
        throw new AuthenticationError('Incorrect username or password');
      }

      const { session, cookie } =
        await authenticationService.createSession(existingUser);

      const { userType } = await authenticationService.validateSession(session.id);

      if (userType !== "Admin") {
        await authenticationService.invalidateSession(session.id);
        throw new AuthenticationError(
          `User not admin`
        );
      }

      return { session, cookie };
    } catch (error) {
      throw error;
    }
  };

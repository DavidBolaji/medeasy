import { Cookie } from '@/src/entities/models/cookie';
import { Session } from '@/src/entities/models/session';
import { IUsersRepository } from '../repositories/user.repository.interface';
import { IAuthenticationService } from '../services/auth.service.interface';
import { signInSchemaType } from '@/src/entities/models/auth/login-schema';
import { ROLE } from '@prisma/client';
import { AuthenticationError } from '@/src/entities/error/auth';

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

const hash = {
  HelpProvider: 'Help Provider',
  AccountOwner: 'Account Owner',
};

export const signInUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: signInSchemaType,
    userRole: ROLE
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

      const { role } = await authenticationService.validateSession(session.id);

      if (role !== userRole) {
        await authenticationService.invalidateSession(session.id);
        throw new AuthenticationError(
          `User With ${hash[role as ROLE] === 'Help Provider' ? 'Account Owner' : 'Help Provider'} account does not exist`
        );
      }

      return { session, cookie };
    } catch (error) {
      throw error;
    }
  };

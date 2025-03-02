import { Lucia } from 'lucia';
import { compare, hash } from 'bcrypt-ts';

import { PASSWORD_SALT_ROUNDS, SESSION_COOKIE } from '@/config';
import { Cookie } from '@/src/entities/models/cookie';
import { Session, sessionSchema } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';
import { IUsersRepository } from '@/src/application/repositories/user.repository.interface';

import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { luciaAdapter } from '@/prisma';
import { ROLE, UserType } from '@prisma/client';

export class AuthenticationService implements IAuthenticationService {
  private _lucia: Lucia;

  constructor(private readonly _usersRepository: IUsersRepository) {
    this._lucia = new Lucia(luciaAdapter, {
      sessionCookie: {
        name: SESSION_COOKIE,
        expires: true,
        attributes: {
          secure: process.env.NODE_ENV === 'production',
        },
      },
      getUserAttributes: (attributes) => {
        return {
          email: attributes.email,
        };
      },
    });
  }

  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string
  ): Promise<boolean> {
    return compare(inputPassword, usersHashedPassword);
  }

  async generateHash(inputPassword: string): Promise<string> {
    return await hash(inputPassword, PASSWORD_SALT_ROUNDS);
  }

  async validateSession(sessionId: string): Promise<{
    user: User;
    session: Session;
    role: ROLE | undefined;
    userType: UserType | undefined;
  }> {
    const result = await this._lucia.validateSession(sessionId);

    if (!result.user || !result.session) {
      throw new UnauthenticatedError('Unauthenticated');
    }

    const user = await this._usersRepository.getUser(result.user.id);

    if (!user) {
      throw new UnauthenticatedError("User doesn't exist");
    }

    const [role, userType] = await Promise.all([
      this._usersRepository.getUserRole(result?.user?.id),
      this._usersRepository.getUserType(result?.user?.id),
    ]);

    return { user, session: result.session, role, userType };
  }

  async createSession(
    user: User
  ): Promise<{ session: Session; cookie: Cookie }> {
    const luciaSession = await this._lucia.createSession(user.id, {});

    const session = sessionSchema.parse(luciaSession);
    const cookie = this._lucia.createSessionCookie(session.id);

    return { session, cookie };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    await this._lucia.invalidateSession(sessionId);
    const blankCookie = this._lucia.createBlankSessionCookie();
    return { blankCookie };
  }
}

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}

import { Cookie } from '@/src/entities/models/cookie';
import { Session } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';
import { ROLE } from '@prisma/client';

export interface IAuthenticationService {
  validateSession(
    sessionId: Session['id']
  ): Promise<{ user: User; session: Session; role: ROLE | undefined }>;
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string
  ): Promise<boolean>;
  generateHash(inputPassword: string): Promise<string>;
  createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  invalidateSession(sessionId: Session['id']): Promise<{ blankCookie: Cookie }>;
}

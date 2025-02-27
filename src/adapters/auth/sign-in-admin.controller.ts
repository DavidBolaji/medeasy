import { Cookie } from '@/src/entities/models/cookie';
import {
  signInSchema,
  signInSchemaType,
} from '@/src/entities/models/auth/login-schema';
import { InputParseError } from '@/src/entities/error/common';

import { IsignInAdminUseCase } from '@/src/application/use-cases/sign-in-admin-use-case';


export type ISignInAdminController = ReturnType<typeof signInAdminController>;

export const signInAdminController =
  (signInAdminUseCase: IsignInAdminUseCase) =>
  async (input: signInSchemaType): Promise<Cookie> => {
    try {
      const { data, error: inputParseError } = signInSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      const { cookie } = await signInAdminUseCase(data);
      return cookie;
    } catch (error) {
      throw error;
    }
  };

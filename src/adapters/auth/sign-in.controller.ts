import { z } from 'zod';

import { Cookie } from '@/src/entities/models/cookie';
import {
  signInSchema,
  signInSchemaType,
} from '@/src/entities/models/auth/login-schema';
import { InputParseError } from '@/src/entities/error/common';
import { ROLE } from '@prisma/client';
import { ISignInUseCase } from '@/src/application/use-cases/sign-in-use-case';

export type ISignInController = ReturnType<typeof signInController>;

export const signInController =
  (signInUseCase: ISignInUseCase) =>
  async (input: signInSchemaType, role: ROLE): Promise<Cookie> => {
    try {
      const { data, error: inputParseError } = signInSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      const { cookie } = await signInUseCase(data, role);
      return cookie;
    } catch (error) {
      throw error;
    }
  };

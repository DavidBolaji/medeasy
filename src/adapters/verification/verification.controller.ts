import { IVerificationService } from '@/src/application/services/verification.service.interface';
import { IVerificationUseCase } from '@/src/application/use-cases/verification/verification-use-case';
import { InputParseError } from '@/src/entities/error/common';
import { IVerifyUser } from '@/src/entities/models/verification';
import { z } from 'zod';

export type IverificationController = ReturnType<typeof verificationController>;

export const verificationController =
  (verificationUseCase: IVerificationUseCase) =>
  async <T extends IVerifyUser>(
    input: T,
    schema: z.ZodSchema,
    methodName: keyof IVerificationService
  ): Promise<string | boolean> => {
    const { data, error: inputParseError } = schema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError('Invalid data', { cause: inputParseError });
    }

    try {
      const response = await verificationUseCase<T>(data, methodName);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

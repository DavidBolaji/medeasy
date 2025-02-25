import { ITransactionService } from '@/src/application/services/transaction.service.interface';
import {
  ISignUpAccountOwnerUseCase,
  ISignUpUseCase,
} from '@/src/application/use-cases/sign-up-use-case';
import { InputParseError, PrismaError } from '@/src/entities/error/common';
import { PrismaErrorHandler } from '@/src/entities/error/prisma-error';
import {
  allSignUpAccountOwnerSchema,
  allSignUppAccountOwnerSchemaType,
  allSignUpSchema,
  allSignUpSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { Cookie } from '@/src/entities/models/cookie';

export type ISignUpController = ReturnType<typeof signUpController>;

export const signUpController =
  (signUpUseCase: ISignUpUseCase, transactionService: ITransactionService) =>
  async (input: allSignUpSchemaType): Promise<Cookie> => {
    try {
      return await transactionService.startTransaction(async (mainTx) => {
        try {
          const { data, error: inputParseError } =
            allSignUpSchema.safeParse(input);

          if (inputParseError) {
            throw new InputParseError('Invalid data', {
              cause: inputParseError,
            });
          }

          const { cookie } = await signUpUseCase(data, mainTx);
          return cookie;
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  };

export type ISignUpAccountOwnerController = ReturnType<
  typeof signUpAccountOwnerController
>;

export const signUpAccountOwnerController =
  (
    signUpAccountOwnerUseCase: ISignUpAccountOwnerUseCase,
    transactionService: ITransactionService
  ) =>
  async (input: allSignUppAccountOwnerSchemaType): Promise<Cookie> => {
    return await transactionService.startTransaction(async (mainTx) => {
      try {
        const { data: signUpData, error: inputParseError } =
          allSignUpAccountOwnerSchema.safeParse(input);

        if (inputParseError) {
          throw new InputParseError('Invalid data', { cause: inputParseError });
        }

        const { cookie } = await signUpAccountOwnerUseCase(
          signUpData as allSignUppAccountOwnerSchemaType,
          mainTx
        );
        return cookie;
      } catch (error) {
        const errorResponse = PrismaErrorHandler.handle(error);
        const isPrismaError = PrismaErrorHandler.getIsPrismaError();

        if (isPrismaError) {
          throw new PrismaError(errorResponse.message);
        }

        throw error;
      }
    });
  };

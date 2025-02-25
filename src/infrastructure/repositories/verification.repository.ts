import { formatDateToDbDate2 } from '@/app/_lib/utils';
import { db } from '@/prisma';

import { IVerificationRepository } from '@/src/application/repositories/verification.repository.interface';
import { PrismaError } from '@/src/entities/error/common';
import { PrismaErrorHandler } from '@/src/entities/error/prisma-error';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ITransaction } from '@/src/entities/models/transaction';
import { Verification } from '@/src/entities/models/verification';
import { Verification as PVerification } from '@prisma/client';

export class VerificationRepository implements IVerificationRepository {
  constructor() {}

  private async findVerification(id: string): Promise<boolean> {
    const verification = await db.verification.findMany({
      where: {
        id,
      },
    });

    return !!verification.length;
  }

  async getVerification(userId: string): Promise<PVerification> {
    try {
      const verification = await db.verification.findFirstOrThrow({
        where: { userId },
      });
      return verification;
    } catch (error) {
      throw error;
    }
  }

  async updateVerification(
    verification: SignUpFourSchemaType,
    userId: string
  ): Promise<void> {
    try {
      await db.verification.update({
        where: { userId },
        data: {
          type: verification.type || undefined,
          id: verification.no || undefined,
          doc: verification.doc || undefined,
          expiry:
            new Date(formatDateToDbDate2(verification.expiry)) || undefined,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createVerification(
    input: Verification,
    userId: string,
    tx: ITransaction
  ): Promise<void> {
    const invoker = tx || db;
    const exist = await this.findVerification(input.id);
    if (exist) {
      throw new PrismaError('user with id exists');
    }

    try {
      await invoker.verification.create({
        data: {
          type: input.type,
          doc: input.doc,
          id: input.id,
          expiry: new Date(formatDateToDbDate2(input.expiry)),
          userId,
        },
      });
    } catch (error) {
      const errorResponse = PrismaErrorHandler.handle(error);

      const isPrismaError = PrismaErrorHandler.getIsPrismaError();

      if (isPrismaError) {
        throw new PrismaError(errorResponse.message);
      }
      throw error;
    }
  }
}

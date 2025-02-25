import db from '@/prisma';
import { IAddressRepository } from '@/src/application/repositories/address.repository.interface';
import { PrismaError } from '@/src/entities/error/common';
import { PrismaErrorHandler } from '@/src/entities/error/prisma-error';
import { SignUpAddressSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ITransaction } from '@/src/entities/models/transaction';
import { Address } from '@prisma/client';

export class AddressRepository implements IAddressRepository {
  constructor() {}
  async getUserAddress(userId: string): Promise<Address> {
    try {
      const address = await db.address.findUnique({ where: { userId } });
      return address as Address;
    } catch (error) {
      throw error;
    }
  }
  async createAddress(
    input: SignUpAddressSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx ?? db;
    try {
      await invoker.address.create({
        data: {
          userId,
          country: input.country,
          address: input.address,
          street: input.street,
          state: input.state,
          other: input?.other ?? undefined,
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

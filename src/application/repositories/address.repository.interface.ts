import { SignUpAddressSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ITransaction } from '@/src/entities/models/transaction';
import { Address } from '@prisma/client';

export interface IAddressRepository {
  getUserAddress(userId: string): Promise<Address>;

  createAddress(
    input: SignUpAddressSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}

import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ITransaction } from '@/src/entities/models/transaction';
import { ICreateVerification } from '@/src/entities/models/verification';
import { Verification } from '@prisma/client';

export interface IVerificationRepository {
  getVerification(userId: string): Promise<Verification>;

  updateVerification(
    verification: SignUpFourSchemaType,
    userId: string
  ): Promise<void>;

  createVerification(
    input: ICreateVerification,
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}

import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { CreatePayment } from '@/src/entities/models/payment';
import { ITransaction } from '@/src/entities/models/transaction';
import { Payment } from '@prisma/client';

export interface IPaymentRepository {
  getUserPayment(userId: string): Promise<Payment>;

  updateUserPayment(
    payment: SignUpFiveSchemaType,
    userId: string
  ): Promise<void>;

  createPayment(
    input: CreatePayment,
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}

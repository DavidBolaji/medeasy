import db from '@/prisma';
import { IPaymentRepository } from '@/src/application/repositories/payment.repository.interface';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { CreatePayment } from '@/src/entities/models/payment';
import { ITransaction } from '@/src/entities/models/transaction';
import { Payment } from '@prisma/client';

export class PaymentRepository implements IPaymentRepository {
  constructor() {}
  async getUserPayment(userId: string): Promise<Payment> {
    try {
      const payment = await db.payment.findFirstOrThrow({ where: { userId } });
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPayment(
    payment: SignUpFiveSchemaType,
    userId: string
  ): Promise<void> {
    try {
      await db.payment.update({
        where: { userId },
        data: {
          actNo: payment.actNo,
          bank: payment.bank,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createPayment(
    input: CreatePayment,
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx ?? db;
    try {
      await invoker.payment.create({
        data: {
          actNo: input.actNo,
          bank: input.bank,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

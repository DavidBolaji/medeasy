import { Payment } from '@prisma/client';
import { IVerificationService } from '../../services/verification.service.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';
import { IPaymentRepository } from '../../repositories/payment.repository.interface';

export type IGetPaymentsForUserUseCase = ReturnType<
  typeof getPaymentsForUserUseCase
>;

export const getPaymentsForUserUseCase =
  (
    paymentRepository: IPaymentRepository,
    userRepository: IUsersRepository,
    verificationService: IVerificationService
  ) =>
  async (
    userId: string
  ): Promise<{ payments: Payment; verification: string }> => {
    try {
      const payments = await paymentRepository.getUserPayment(userId);
      const user = await userRepository.getUserDetails(userId);

      const verification = await verificationService.validateUserAccount({
        type: '',
        idNumber: '',
        actNo: payments.actNo,
        bank: payments.bank,
        user: {
          fname: user?.fname as string,
          lname: user?.lname as string,
          dob: user?.dob.toISOString() as string,
        },
      });
      return { payments, verification };
    } catch (error) {
      throw error;
    }
  };

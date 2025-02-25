import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { IPaymentRepository } from '../../repositories/payment.repository.interface';
import { IVerificationService } from '../../services/verification.service.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';
import { UnauthenticatedError } from '@/src/entities/error/auth';

export type IUpdatePaymentForUserUseCase = ReturnType<
  typeof updatePaymentForUserUseCase
>;

export const updatePaymentForUserUseCase =
  (
    paymentRepository: IPaymentRepository,
    verificationService: IVerificationService,
    userRepository: IUsersRepository
  ) =>
  async (payment: SignUpFiveSchemaType, userId: string) => {
    try {
      const user = await userRepository.getUserDetails(userId);
      const verification = await verificationService.validateUserAccount({
        type: '',
        idNumber: '',
        actNo: payment.actNo,
        bank: payment.bank,
        user: {
          fname: user?.fname as string,
          lname: user?.lname as string,
          dob: user?.dob.toISOString() as string,
        },
      });

      if (!Boolean(verification.length)) {
        throw new UnauthenticatedError('Wrong Credentials');
      }

      return await paymentRepository.updateUserPayment(payment, userId);
    } catch (error) {
      throw error;
    }
  };

import { IVerifyUser } from '@/src/entities/models/verification';
import { IUsersRepository } from '../../repositories/user.repository.interface';
import { IVerificationService } from '../../services/verification.service.interface';

export type IUpdatePaymentValidationForUserUseCase = ReturnType<
  typeof updatepdatePaymentValidationForUserUseCase
>;

export const updatepdatePaymentValidationForUserUseCase =
  (
    verificationService: IVerificationService,
    userRepository: IUsersRepository
  ) =>
  async (payments: Pick<IVerifyUser, 'actNo' | 'bank'>, userId: string) => {
    try {
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

      return verification;
    } catch (error) {
      throw error;
    }
  };

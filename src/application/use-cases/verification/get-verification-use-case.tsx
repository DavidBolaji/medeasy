import { Verification } from '@prisma/client';
import { IVerificationRepository } from '../../repositories/verification.repository.interface';
import { IVerificationService } from '../../services/verification.service.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetVerificationForUserUseCase = ReturnType<
  typeof getVerificationForUserUseCase
>;

export const getVerificationForUserUseCase =
  (
    verificationRepository: IVerificationRepository,
    verificationService: IVerificationService,
    userRepository: IUsersRepository
  ) =>
  async (
    userId: string
  ): Promise<{ verification: Verification; verified: boolean }> => {
    try {
      const [verification, user] = await Promise.all([
        verificationRepository.getVerification(userId),
        userRepository.getUserDetails(userId),
      ]);

      const verified = await verificationService.validateUser({
        type: verification.type || '',
        idNumber: verification.id || '',
        actNo: '',
        user: {
          lname: user?.lname as string,
          fname: user?.fname as string,
          dob: user?.dob.toString() as string,
        },
      });
      return { verification, verified };
    } catch (error) {
      throw error;
    }
  };

import { IVerificationService } from '../../services/verification.service.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';
import { IVerifyUser } from '@/src/entities/models/verification';

export type IUpdateIDVerificationForUserUseCase = ReturnType<
  typeof updateIDVerificationForUserUseCase
>;

export const updateIDVerificationForUserUseCase =
  (
    verificationService: IVerificationService,
    userRepository: IUsersRepository
  ) =>
  async (
    input: Omit<IVerifyUser, 'user'>,
    userId: string
  ): Promise<{ verified: boolean }> => {
    try {
      const [user] = await Promise.all([userRepository.getUserDetails(userId)]);

      const verified = await verificationService.validateUser({
        type: input.type || '',
        idNumber: input.idNumber || '',
        actNo: '',
        user: {
          lname: user?.lname as string,
          fname: user?.fname as string,
          dob: user?.dob.toString() as string,
        },
      });
      return { verified };
    } catch (error) {
      throw error;
    }
  };

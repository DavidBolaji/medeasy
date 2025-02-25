import { IVerificationRepository } from '../../repositories/verification.repository.interface';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateVerificationForUserUseCase = ReturnType<
  typeof updateVerificationForUserUseCase
>;

export const updateVerificationForUserUseCase =
  (verificationRepository: IVerificationRepository) =>
  async (verification: SignUpFourSchemaType, userId: string): Promise<void> => {
    try {
      await Promise.all([
        verificationRepository.updateVerification(verification, userId),
      ]);
    } catch (error) {
      throw error;
    }
  };

import { UpdateUserVerification } from '@/src/entities/models/user';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IUpdateUserVerificationUseCase = ReturnType<
  typeof updateUserVerificationUseCase
>;

export const updateUserVerificationUseCase =
  (userRepository: IUsersRepository) =>
  async (input: UpdateUserVerification): Promise<void> => {
    try {
      return await userRepository.updateVerification(input);
    } catch (error) {
      throw error;
    }
  };

import { IUsersRepository } from '../../repositories/user.repository.interface';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateDetailsForUserUseCase = ReturnType<
  typeof updateDetailsForUserUseCase
>;

export const updateDetailsForUserUseCase =
  (userRepository: IUsersRepository) =>
  async (user: SignUpTwoSchemaType, userId: string): Promise<void> => {
    try {
      return await userRepository.updateUserDetails(user, userId);
    } catch (error) {
      throw error;
    }
  };

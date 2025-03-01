import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetDetailsWithIdUseCase = ReturnType<
  typeof getDetailWithIdUseCase
>;

export const getDetailWithIdUseCase =
  (userRepository: IUsersRepository) =>
  async (userId: string): Promise<User> => {
    try {
      return (await userRepository.getUserDetails(userId)) as User;
    } catch (error) {
      throw error;
    }
  };

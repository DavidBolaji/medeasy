import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetDetailForUserUseCase = ReturnType<
  typeof getDetailForUserUseCase
>;

export const getDetailForUserUseCase =
  (userRepository: IUsersRepository) =>
  async (userId: string): Promise<User> => {
    try {
      return (await userRepository.getUserDetails(userId)) as User;
    } catch (error) {
      throw error;
    }
  };

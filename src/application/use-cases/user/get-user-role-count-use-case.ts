
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetUserRoleCountUseCase = ReturnType<
  typeof getUserRoleCountUseCase
>;

export const getUserRoleCountUseCase =
  (userRepository: IUsersRepository) =>
  async () => {
    try {
      return (await userRepository.getUserRoleCount());
    } catch (error) {
      throw error;
    }
  };

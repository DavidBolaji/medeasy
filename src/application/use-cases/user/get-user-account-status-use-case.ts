import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetUserAccountStatusUseCase = ReturnType<
  typeof getUserAccountStatusUseCase
>;

export const getUserAccountStatusUseCase =
  (userRepository: IUsersRepository) => async () => {
    try {
      return await userRepository.getUserAccountStatus();
    } catch (error) {
      throw error;
    }
  };

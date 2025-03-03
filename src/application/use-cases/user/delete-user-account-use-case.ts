import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IDeleteUserAccountUseCase = ReturnType<
  typeof deleteUserAccountUseCase
>;

export const deleteUserAccountUseCase =
  (userRepository: IUsersRepository) =>
  async (id: string): Promise<void> => {
    try {
      return await userRepository.deleteUserAccount(id);
    } catch (error) {
      throw error;
    }
  };

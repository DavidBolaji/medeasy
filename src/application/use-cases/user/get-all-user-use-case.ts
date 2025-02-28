import { GetAllUserParams } from '@/src/entities/models/user';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetAllUserUseCase = ReturnType<typeof getAllUserUseCase>;

export const getAllUserUseCase =
  (userRepository: IUsersRepository) => async (input: GetAllUserParams) => {
    try {
      return await userRepository.getAllUser(input);
    } catch (error) {
      throw error;
    }
  };

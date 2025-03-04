import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IDeleteManyRequestUseCase = ReturnType<
  typeof deleteManyRequestUseCase
>;

export const deleteManyRequestUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: Set<string>): Promise<void> => {
    try {
      return await requestRepository.deleteManyRequest(input);
    } catch (error) {
      throw error;
    }
  };

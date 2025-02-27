import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetMonthlyCompletedUseCase = ReturnType<
  typeof getMonthlyCompletedusUseCase
>;

export const getMonthlyCompletedusUseCase =
  (requestRepository: IRequestRepository) => async () => {
    try {
      return await requestRepository.getMonthlyCompleted();
    } catch (error) {
      throw error;
    }
  };

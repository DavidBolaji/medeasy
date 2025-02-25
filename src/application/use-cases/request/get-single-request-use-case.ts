import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetSingleRequestUseCase = ReturnType<
  typeof getSingleRequestUseCase
>;

export const getSingleRequestUseCase =
  (requestRepository: IRequestRepository) => async (requestId: string) => {
    try {
      const request = await requestRepository.getSingleRequest(requestId);
      return { request };
    } catch (error) {
      throw error;
    }
  };

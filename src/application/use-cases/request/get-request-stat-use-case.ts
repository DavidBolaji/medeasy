import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetRequestStatusUseCase = ReturnType<
  typeof getRequestStatusUseCase
>;

export const getRequestStatusUseCase =
  (requestRepository: IRequestRepository) => async () => {
    try {
      return await requestRepository.getRequestStat();
    } catch (error) {
      throw error;
    }
  };

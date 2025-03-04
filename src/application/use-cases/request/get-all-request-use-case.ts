import { GetAllRequestParams } from '@/src/entities/models/requests';
import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetAllRequestUseCase = ReturnType<typeof getAllRequestUseCase>;

export const getAllRequestUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: GetAllRequestParams) => {
    try {
      return await requestRepository.getAllRequest(input);
    } catch (error) {
      throw error;
    }
  };

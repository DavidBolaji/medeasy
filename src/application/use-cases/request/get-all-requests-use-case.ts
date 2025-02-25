import { GetRequestsSchemaType } from '@/src/entities/models/requests';
import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetAllRequestsUseCase = ReturnType<typeof getAllRequestsUseCase>;

export const getAllRequestsUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: GetRequestsSchemaType, userId: string) => {
    try {
      return await requestRepository.getAllRequests(input, userId);
    } catch (error) {
      throw error;
    }
  };

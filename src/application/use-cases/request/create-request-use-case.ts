import { RequestSchemaType } from '@/src/entities/models/requests';
import { IRequestRepository } from '../../repositories/request.repository.interface';

export type ICreateRequestUseCase = ReturnType<typeof createRequestUseCase>;

export const createRequestUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: RequestSchemaType, userId: string) => {
    try {
      await requestRepository.createRequest(input, userId);
    } catch (error) {
      throw error;
    }
  };

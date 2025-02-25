import { GetRequestsSchemaType } from '@/src/entities/models/requests';
import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IGetAccountOwnerRequestsUseCase = ReturnType<
  typeof getAccountOwnerRequestsUseCase
>;

export const getAccountOwnerRequestsUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: GetRequestsSchemaType, userId: string) => {
    try {
      return await requestRepository.getAccountOwnerRequests(input, userId);
    } catch (error) {
      throw error;
    }
  };

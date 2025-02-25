import { AccptedBiderSchemaType } from '@/src/entities/models/bid';
import { IRequestRepository } from '../../repositories/request.repository.interface';

export type IAcceptBiderOfferUseCase = ReturnType<
  typeof acceptBiderOfferUseCase
>;

export const acceptBiderOfferUseCase =
  (requestRepository: IRequestRepository) =>
  async (input: AccptedBiderSchemaType) => {
    try {
      await requestRepository.acceptOffer(input);
    } catch (error) {
      throw error;
    }
  };

import { UpdateBidingOfferForRequestSchemaType } from '@/src/entities/models/bid';
import { IBidRepository } from '../../repositories/bid.repository.interface';

export type IUpdateBidingOfferForRequestUseCase = ReturnType<
  typeof updateBidingOfferForRequestUseCase
>;

export const updateBidingOfferForRequestUseCase =
  (bidRepository: IBidRepository) =>
  async (input: UpdateBidingOfferForRequestSchemaType, userId: string) => {
    try {
      await bidRepository.updateBiderPrice(input, userId);
    } catch (error) {
      throw error;
    }
  };

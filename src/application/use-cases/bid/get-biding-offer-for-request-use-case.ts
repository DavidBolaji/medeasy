import { IBidRepository } from '../../repositories/bid.repository.interface';

export type IGetBidingOfferForRequestUseCase = ReturnType<
  typeof getBidingOfferForRequestUseCase
>;

export const getBidingOfferForRequestUseCase =
  (bidingRepository: IBidRepository) =>
  async (requestId: string, userId: string) => {
    try {
      return await bidingRepository.getBider(requestId, userId);
    } catch (error) {
      throw error;
    }
  };

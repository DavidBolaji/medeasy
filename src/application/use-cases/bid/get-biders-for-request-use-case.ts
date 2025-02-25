import { IBidRepository } from '../../repositories/bid.repository.interface';

export type IGetBidersForRequestUseCase = ReturnType<
  typeof getBidersForRequestUseCase
>;

export const getBidersForRequestUseCase =
  (bidRepository: IBidRepository) => async (requestId: string) => {
    try {
      const biders = await bidRepository.getBiders(requestId);
      return biders;
    } catch (error) {
      throw error;
    }
  };

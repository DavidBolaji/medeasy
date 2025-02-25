import { BidSchemaType } from '@/src/entities/models/bid';
import { IBidRepository } from '../../repositories/bid.repository.interface';

export type ICreateBidUseCase = ReturnType<typeof createBidUseCase>;

export const createBidUseCase =
  (bidRepository: IBidRepository) =>
  async (input: BidSchemaType, userId: string, requestId: string) => {
    try {
      return await bidRepository.createBid(input, userId, requestId);
    } catch (error) {
      throw error;
    }
  };

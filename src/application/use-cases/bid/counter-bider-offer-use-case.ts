import { CounterBiderOfferSchemaType } from '@/src/entities/models/bid';
import { IBidRepository } from '../../repositories/bid.repository.interface';

export type ICounterBiderOfferUseCase = ReturnType<
  typeof counterBiderOfferUseCase
>;

export const counterBiderOfferUseCase =
  (biderRepository: IBidRepository) =>
  async (input: CounterBiderOfferSchemaType, userId: string) => {
    try {
      await biderRepository.counterBid(input, userId);
    } catch (error) {
      throw error;
    }
  };

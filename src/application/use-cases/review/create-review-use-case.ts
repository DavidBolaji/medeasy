import { CreateReviwSchemaType } from '@/src/entities/models/review';
import { IReviewRepository } from '../../repositories/review.repository.interface';

export type ICreateReviewUseCase = ReturnType<typeof createReviewUseCase>;

export const createReviewUseCase =
  (reviewRepository: IReviewRepository) =>
  async (input: CreateReviwSchemaType, userId: string) => {
    try {
      await reviewRepository.createReview(input, userId);
    } catch (error) {
      throw error;
    }
  };

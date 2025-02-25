import { UpdateReviwSchemaType } from '@/src/entities/models/review';
import { IReviewRepository } from '../../repositories/review.repository.interface';

export type IUpdateReviewUseCase = ReturnType<typeof updateReviewUseCase>;

export const updateReviewUseCase =
  (reviewRepository: IReviewRepository) =>
  async (input: UpdateReviwSchemaType) => {
    try {
      await reviewRepository.updateReview(input);
    } catch (error) {
      throw error;
    }
  };

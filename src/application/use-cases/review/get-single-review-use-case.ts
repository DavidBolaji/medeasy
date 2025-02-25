import { IReviewRepository } from '../../repositories/review.repository.interface';

export type IGetSingleReviewUseCase = ReturnType<typeof getSingleReviewUseCase>;

export const getSingleReviewUseCase =
  (reviewRepository: IReviewRepository) =>
  async (receivedId: string, requestId: string, userId: string) => {
    try {
      const review = await reviewRepository.getSingleReview(
        receivedId,
        requestId,
        userId
      );
      return { review };
    } catch (error) {
      throw error;
    }
  };

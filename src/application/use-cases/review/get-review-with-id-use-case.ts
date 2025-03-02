import { IReviewRepository } from '../../repositories/review.repository.interface';

export type IGetReviewsWithIdUseCase = ReturnType<
  typeof getReviewsWithIdUseCase
>;

export const getReviewsWithIdUseCase =
  (reviewRepository: IReviewRepository) => async (userId: string) => {
    try {
      return await reviewRepository.getReviewsWithId(userId);
    } catch (error) {
      throw error;
    }
  };

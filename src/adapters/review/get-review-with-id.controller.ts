import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetReviewsWithIdUseCase } from '@/src/application/use-cases/review/get-review-with-id-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  ReturnReviewsWithIdType,
  ReviewsWithId,
} from '@/src/entities/models/review';

export type IGetReviewsWithIdController = ReturnType<
  typeof getReviewsWithIdController
>;

function presenter(
  reviews: ReviewsWithId[] | null
): ReturnReviewsWithIdType[] | null {
  if (!reviews) {
    return null;
  }
  return reviews.map((review) => ({
    title: review.title,
    description: review.description,
    star: +review.star.toString(),
    reviewer: {
      fname: review.reviewer.fname,
      lname: review.reviewer.lname,
    },
  }));
}

export const getReviewsWithIdController =
  (
    getReviewsWithIdUseCase: IGetReviewsWithIdUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (id: string, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get reviews');
      }

      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      const reviews = await getReviewsWithIdUseCase(id);
      return presenter(reviews);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

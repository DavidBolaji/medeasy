import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetSingleReviewUseCase } from '@/src/application/use-cases/review/get-single-review-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { ReturnSingleReviewSchemaType } from '@/src/entities/models/review';
import { Reviews } from '@prisma/client';

export type IGetSingleReviewController = ReturnType<
  typeof getSingleReviewController
>;

function presenter(
  review: Reviews | null
): ReturnSingleReviewSchemaType | null {
  if (!review) {
    return null;
  }
  return {
    id: review.id,
    creatorId: review.creatorId,
    receivedId: review.receivedId,
    title: review.title,
    description: review.description,
    star: +review.star.toString(),
  };
}

export const getSingleReviewController =
  (
    getSingleReviewUseCase: IGetSingleReviewUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    reviewerId: string,
    requestId: string,
    sessionId: string | undefined
  ) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get review');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      const { review } = await getSingleReviewUseCase(
        reviewerId,
        requestId,
        session.userId
      );

      return presenter(review);
    } catch (error) {
      throw error;
    }
  };

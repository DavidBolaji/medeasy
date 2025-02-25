import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateReviewUseCase } from '@/src/application/use-cases/review/update-review-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  updateReviwSchema,
  UpdateReviwSchemaType,
} from '@/src/entities/models/review';

export type IUpdateReviewController = ReturnType<typeof updateReviewController>;

export const updateReviewController =
  (
    updateReviewUseCase: IUpdateReviewUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: UpdateReviwSchemaType,
    sessionId: string | undefined
  ): Promise<void> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update review');
      }

      await authenticationService.validateSession(sessionId);

      const { data: review, error: inputParseError } =
        updateReviwSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updateReviewUseCase(review);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

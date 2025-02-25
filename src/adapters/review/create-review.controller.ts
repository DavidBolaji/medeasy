import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { ICreateReviewUseCase } from '@/src/application/use-cases/review/create-review-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  createReviwSchema,
  CreateReviwSchemaType,
} from '@/src/entities/models/review';

export type ICreateReviewController = ReturnType<typeof createReviewController>;

export const createReviewController =
  (
    createReviewUseCase: ICreateReviewUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: CreateReviwSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to create review');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: request, error: inputParseError } =
        createReviwSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await createReviewUseCase(request, session.userId);
    } catch (error) {
      throw error;
    }
  };

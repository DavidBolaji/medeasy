import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/update-biding-offer-for-request-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  updateBidingOfferForRequestSchema,
  UpdateBidingOfferForRequestSchemaType,
} from '@/src/entities/models/bid';

export type IUpdateBidingOfferForRequestController = ReturnType<
  typeof updateBidingOfferForRequestController
>;

export const updateBidingOfferForRequestController =
  (
    updateBidingOfferForRequestUseCase: IUpdateBidingOfferForRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: UpdateBidingOfferForRequestSchemaType,
    sessionId: string | undefined
  ) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update biding');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: biding, error: inputParseError } =
        updateBidingOfferForRequestSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      return await updateBidingOfferForRequestUseCase(biding, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
